# cypressAutomation

# Introduction 
Cypress-based automation suite for the Insights module of the ViewIQ platform

# Prerequisite

Install Node.js , To Install node.js plase follow https://docs.npmjs.com/downloading-and-installing-node-js-and-npm 

# Getting Started
INSTALL DEPENDENCIES  : npm install

# Run the test while developing 
npx cypress open

# To run the suite from terminal 
npm run cy-run-all

# NOTE 

The delete:reports script differs based on the operating system.
Use rm -r for Linux/macOS environments and rmdir /s /q for Windows Command Prompt to remove the Cypress reports directory.

Created a .env file to store sensitive information such as PASSWORD, MAILOSAUR_API_KEY, and MAILOSAUR_SERVER_ID. This ensures that these credentials are not exposed or committed to the Git repository.
