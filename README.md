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

"delete:reports": "rm -r cypress/reports/* || true", // this script from package.json will only work on Linux or mac 

"delete:reports": "rmdir /s /q cypress/reports/* || true", // this script from package.json will only work on WIN CP if you are working on 