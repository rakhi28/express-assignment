# Instructions to complete the assigment.

## Prerequisites installations
  * nodejs
  * mysql
  * git
  
  

## Process to create a Pull request
### Step 1

Fork this repository

### Step 2

Implement the features requested in the assigment

### Step 3

Create a Pull request for the fork.

> Note : Any PR to merge branch will not be entertained

# Assignment List
* [Service Status (Beginner)](./Assignment-1.md)
* [Approval System (Intermediate)](./Assignment-2.md)

# Instructions for the Assigment
### Code and modules
 * You are free to add any package. ``Ensure that it is part fo package.json``.'
 * All configurations should be able to be configured using environment variables.
 
### User Interface
 * There should be a UI where I can specify the Input.
 * All UI should have a traversable Menu to access the appropriate actions.
 * For CSS use Bootstrap. If you use SASS or LESS it will fetch additional points.
 
### Error Handling
 * Error Handling should be proper. All validations should be handled.
 * Ensure that exceptions do not shut down your server.
 * Error handling should be as per the following article [Error Handling in Node.js](https://www.joyent.com/node-js/production/design/errors)
 
 
### Logging
 * Use an external logger to classify your output messages into info, debug and error.
 * Error messages should be shown on the console or logged in a file based on the environment
 * I should be able to disable the logger in production mode.
 
### npm scripts 
 * we should have the following npm scripts
 * `npm start` should start both node server and the front end application.
 * `npm test` should run all the test cases.
 
### unit test cases
 * All server side code should have unit test cases written in [Jasmin](https://jasmine.github.io)
 
### working and how to run
 * Use Postman app provided by Chrome to run all the methods. 
 * There is no FrontEnd to this application. Complete Server-side implementation has been done. 
 * `npm start` will start node server. Test cases not specified. 
 
