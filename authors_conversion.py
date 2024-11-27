import os
import requests
from glob import glob

# Base details for fetching authors and avatars
repo_owner = "jenkins-infra"
repo_name = "jenkins.io"
source_authors_path = "content/_data/authors"
source_avatars_path = "content/images/avatars"
base_api_url = f"https://api.github.com/repos/{repo_owner}/{repo_name}/contents/{source_authors_path}"
base_raw_authors_url = f"https://raw.githubusercontent.com/{repo_owner}/{repo_name}/master/{source_authors_path}"
base_raw_avatars_url = f"https://raw.githubusercontent.com/{repo_owner}/{repo_name}/master/{source_avatars_path}"

# Local directories for target authors and avatars
target_dir = "/workspaces/docs.jenkins.io/site/authors"
avatars_dir = "/workspaces/docs.jenkins.io/site/avatars"

# Ensure target directories exist
os.makedirs(target_dir, exist_ok=True)
os.makedirs(avatars_dir, exist_ok=True)


def fetch_local_avatars():
    """
    Fetch all local avatar paths using glob.
    """
    print("Fetching local avatars...")
    avatars = glob(os.path.join(avatars_dir, "*.*"))
    print(f"Local avatars found: {avatars}")
    return {os.path.basename(avatar): avatar for avatar in avatars}


def fetch_author_files():
    """
    Fetch the list of author `.adoc` files from the GitHub API.
    """
    try:
        response = requests.get(base_api_url, timeout=10)
        if response.status_code == 200:
            return [file["name"] for file in response.json() if file["name"].endswith(".adoc")]
        else:
            print(f"Failed to fetch author files: HTTP {response.status_code}")
            return []
    except Exception as e:
        print(f"Error fetching author files: {e}")
        return []


def try_fetch_avatar(username):
    """
    Attempts to fetch the avatar for the given username across extensions,
    first checking locally and then remotely.
    """
    # Check for local avatars
    local_avatars = fetch_local_avatars()
    for ext in ["png", "jpg", "jpeg", "gif"]:
        avatar_filename = f"{username}.{ext}"
        if avatar_filename in local_avatars:
            print(f"Found local avatar for {username}: {local_avatars[avatar_filename]}")
            return f"/site/avatars/{avatar_filename}"

    # Fetch remotely if not found locally
    print(f"Fetching remote avatar for username: {username}")
    for ext in ["png", "jpg", "jpeg", "gif"]:
        avatar_url = f"{base_raw_avatars_url}/{username}.{ext}"
        try:
            response = requests.get(avatar_url, timeout=10)
            if response.status_code == 200:
                avatar_path = os.path.join(avatars_dir, f"{username}.{ext}")
                with open(avatar_path, "wb") as avatar_file:
                    avatar_file.write(response.content)
                print(f"Avatar saved: {avatar_path}")
                return f"/site/avatars/{username}.{ext}"
        except Exception as e:
            print(f"Error fetching avatar from {avatar_url}: {e}")
    print(f"No avatar found for {username}.")
    return None


def convert_author_data(source_content, filename):
    """
    Converts the author's data and includes avatar fetching.
    """
    lines = source_content.splitlines()
    metadata = {}
    body = []
    inside_metadata = False

    # Extract metadata from source content
    for line in lines:
        if line.startswith("---"):
            inside_metadata = not inside_metadata
        elif inside_metadata and ":" in line:
            key, _, value = line.partition(":")
            metadata[key.strip()] = value.strip().strip('"')
        else:
            body.append(line)

    # Construct target format
    target = "= About the Author\n"
    target += ":page-layout: author\n"

    if "name" in metadata:
        target += f":page-author_name: {metadata['name']}\n"
    if "twitter" in metadata:
        target += f":page-twitter: {metadata['twitter']}\n"
    if "github" in metadata:
        target += f":page-github: {metadata['github']}\n"
        # Use the file name (without .adoc) for fetching avatars
        username = filename.replace(".adoc", "")
        avatar_path = try_fetch_avatar(username)
        if avatar_path:
            target += f":page-authoravatar: {avatar_path}\n"
    if "irc" in metadata:
        target += f":page-irc: {metadata['irc']}\n"
    if "linkedin" in metadata:
        target += f":page-linkedin: {metadata['linkedin']}\n"

    # Add body content
    target += "\n" + "\n".join(body)
    return target


def main():
    # Fetch all author files
    author_files = fetch_author_files()

    # Process each author file
    for author_file in author_files:
        target_file = os.path.join(target_dir, author_file)

        # Skip processing if the target file already exists
        if os.path.exists(target_file):
            print(f"Skipping existing file: {author_file}")
            continue

        source_url = f"{base_raw_authors_url}/{author_file}"
        print(f"Processing new file: {author_file}")

        # Fetch and convert the content
        try:
            response = requests.get(source_url, timeout=10)
            if response.status_code == 200:
                source_content = response.text
                converted_content = convert_author_data(source_content, author_file)

                # Save converted content
                with open(target_file, "w", encoding="utf-8") as f:
                    f.write(converted_content)
            else:
                print(f"Failed to fetch content for {author_file}: HTTP {response.status_code}")
        except Exception as e:
            print(f"Error processing {author_file}: {e}")

    print("Processing complete.")


if __name__ == "__main__":
    main()