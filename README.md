# Technical Tests:
This project contains all tests related to UI and API scenarios

## Tools:
* Cypress
* npm
* JavaScript
* VS Code

## Concepts included:
* Commonly used Cypress commands
* Common web page interaction method
* Commonly used test utility class

## Requirements:
To utilize this project, you need to have the following installed locally:
* node.js
* VS Code

## Useage:
* Open the TestK project in VS Code
* In terminal run the command to install Cypress: npm install cypress --save-dev

## Action before execution:
* In the cypress.config.js enter default values for apiUrl and baseUrl
* To overide default baseUrl in the config use this command: node_modules/.bin/cypress run baseUrl="define new baseurl"
* To overide default apiUrl in the config use this command: node_modules/.bin/cypress run apiurl="define new apiUrl"
* To overide default amount in the config use this command: node_modules/.bin/cypress run amount="define new amount"
* To overide default email in the config use this command: node_modules/.bin/cypress run email="define new email"


## Test execution:
* To run the test, navigate to TestK directory and run: node_modules/.bin/cypress run
* After the test execution it will execute Mochawesome html Report which can be accessed via link generated
* Alternatively you can run tests in cypress user friendly runner with command: node_modules/.bin/cypress open
* You can select individual test in the runner to execute


