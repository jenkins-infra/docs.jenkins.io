# Jenkins Documentation

This repository hosts parts of the docs of [jenkins.io](https://www.jenkins.io/).

- Developer Guide
- User Guide
- Tutorials
- Solutions Pages
- Books

# How to build the Antora versioned docs locally

## Installing Antora and its Prerequisites

1. **Install Node.js and npm**

Install Node.js and npm preferably using nvm as the Node Version Manager: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

- Alternatively, download and install Node.js from the official Node.js website: [https://nodejs.org](https://nodejs.org)
- After installing via either way, verify the installation by running the following commands in your terminal or command prompt:

```bash
node --version
npm --version
```

2. **Run the Makefile**

Run the following at the root of the repository:

```bash
make all
```

Once the Antora site is up and running it should be available locally at [http://127.0.0.1:8080](http://127.0.0.1:8080). 
