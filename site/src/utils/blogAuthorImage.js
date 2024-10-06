export function blogAuthorImage(input) {
    if (input != null) {
        input = input.replace(/\s/g, "");
        input = input.split(",");
        return input;
    }
    return "";
}
