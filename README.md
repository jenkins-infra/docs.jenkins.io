# Jenkins Documentation

This repository hosts the documentation source for Jenkins.

- Developer Documentation
- User Documentation
- Tutorials
- Blog

# How to build Antora and Gatsby locally

## Installing Antora and its Prerequisites

To install Antora and its prerequisites, follow these steps:

1. **Install Node.js and npm:**

- Download and install Node.js from the official Node.js website: [https://nodejs.org](https://nodejs.org)
- Verify the installation by running the following commands in your terminal or command prompt:

```bash
node --version
npm --version
```

2. **Install Antora:**

- Open your terminal or command prompt.
- Run the following command to install Antora globally:

```bash
npm install -g @antora/cli@3.0 @antora/site-generator-default@3.1.5
```

- Verify the installation by running the following command:

```bash
antora --version
```

Note: Antora is a static site generator for creating documentation sites. Once installed, you can use Antora to build and publish your documentation.

Congratulations! You have successfully installed Antora and its prerequisites.

## Running Antora

To generate the site, point the antora command at your playbook file which you can find in [jenkins-ui repository](https://github.com/Vandit1604/jenkins-ui/tree/master/playbook-repo). In the terminal, make sure you’re in playbook-repo directory, then type:

```bash
npx antora --fetch antora-playbook.yml
```

Antora will clone the content and UI repositories and generate your documentation site to the default output directory.

## Installing Gatsby and its Prerequisites

To install Gatsby and its prerequisites, follow these steps:

1. **Install Node.js and npm:**

Since you would have installed Node.js and npm at this point.

2. **Install Gatsby CLI:**

- Open your terminal or command prompt.
- Run the following command to install the Gatsby CLI globally:

```bash
npm install -g gatsby-cli
```

- Verify the installation by running the following command:

```bash
gatsby --version
```

Congratulations! You have successfully installed Gatsby and its prerequisites.

**Note:** Gatsby is a React-based framework for building fast and optimized websites. Once installed, you can use the Gatsby CLI to create and develop Gatsby projects.

Remember to run the commands in a terminal or command prompt environment to execute the installation steps.

## Running Gatsby

1. Change into correct directory

```bash
cd blog-gatsby-test
```

2. Build site locally
   Start the local development server with

```bash
npm run develop
```

Gatsby will start a hot-reloading development environment accessible by default at http://localhost:8000.
