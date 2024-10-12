# README for Jenkins.io Gatsby Project

## Overview

This repository contains the Gatsby.js project for Jenkins.io, the official website for the Jenkins project. Jenkins is an open-source automation server that enables developers to automate tasks related to building, testing, and deploying software. This website serves as a comprehensive resource for Jenkins users, providing advisories, guides, author contributions, event information, pipeline steps, upgrade documentation, and more.

The project is built using [Gatsby.js](https://www.gatsbyjs.com/), a modern site generator for React. It allows for fast, optimized static websites with dynamic data fetching from a variety of sources, making it ideal for a large-scale website like Jenkins.io.

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Contributing](#contributing)
- [Available Content](#available-content)

## Project Structure

The project is structured as follows:

```
.
├── advisories           # Contains Jenkins security advisories and related documentation
├── authors              # Holds information and contributions from community authors
├── content              # Contains general content pages or markdown files for the site
├── data                 # Stores site data such as changelogs, roadmap, events and upgrades used in the project
├── gatsby-browser.js    # Gatsby-specific file for configuring the browser APIs (e.g., handling page transitions)
├── gatsby-config.js     # Main configuration file for Gatsby that defines site metadata, plugins, etc.
├── gatsby-node.js       # Custom Node.js configuration for Gatsby’s build process (e.g., dynamic page creation)
├── gatsby-ssr.jsx       # Server-Side Rendering API configurations to control how the site is rendered on the server
├── node_modules         # Contains installed Node.js packages and dependencies
├── package.json         # NPM package manifest file, lists dependencies, and contains scripts for development/build
├── package-lock.json    # Lockfile that ensures consistent dependency versions across environments
├── public               # Built output of the site, generated after running `gatsby build`
├── README.md            # Project README file, explains how to set up and run the project (documentation)
├── src                  # Source directory containing main site code (e.g., React components, pages, templates)
├── static               # Static files such as images, fonts, and other assets
├── steps                # Contains documentation on Jenkins pipeline steps, with examples and syntax
└── upgrades             # Guides and documents for upgrading Jenkins versions and handling migrations
```

## Installation

Before you start working on the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.x or higher recommended)
- [Gatsby CLI](https://www.gatsbyjs.com/docs/reference/gatsby-cli/) (Command Line Interface)

To install Gatsby CLI globally, run the following command:

```bash
npm install -g gatsby-cli
```

After cloning the repository, navigate into the project directory and install all required dependencies:

```bash
npm install
```

## Running the Project

To start a local development server, use the following command:

```bash
gatsby develop
```

This will start a local server at `http://localhost:8000`, where you can preview changes as you make updates to the project files.

## Contributing

We welcome contributions from the Jenkins community! If you’d like to contribute, please follow these steps:

1. Fork this repository.
2. Create a new branch for your feature or bugfix.
3. Make your changes and commit them with clear, concise messages.
4. Push the changes to your fork.
5. Open a pull request to the main repository.

Before submitting a pull request, ensure that your changes are aligned with the project's goals and code quality standards. We recommend running the following commands to check for any issues:

- **Build**: `gatsby build` to ensure the build process runs successfully.
- **Lint**: Use linting tools to ensure your code adheres to project style guidelines.

## Available Content

This project powers various sections of the Jenkins.io website, including but not limited to:

1. **Security Advisories**: Stay informed about security vulnerabilities, patches, and updates for Jenkins.
2. **Authors**: Highlight contributors from the Jenkins community.
2. **Roadmap**: It contains the Roadmap for Jenkins Project. 
3. **Events**: Stay up-to-date with Jenkins conferences, meetups, and other community events.
4. **Pipeline Steps**: Detailed documentation on Jenkins pipeline steps, including syntax and examples.
5. **Upgrade Guides**: Comprehensive guides for upgrading Jenkins installations to newer versions.
6. **Blog Posts**: News and announcements from the Jenkins project and community.


For any issues or inquiries, feel free to open an issue in the repository or contact the Jenkins team at [Jenkins.io](https://www.jenkins.io/participate/).

Happy coding!
