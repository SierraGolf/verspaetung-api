# Verspaetung API

## Project structure
### Technology
This project is a nodejs application implemented using the [express framework](https://expressjs.com/).
The application has been developed in TDD-style using the [cucumber framework for javascript](https://github.com/cucumber/cucumber-js).

### Folder structure
The project's folder structure resembles a java project structure having a `src` directory with `main` and `test` sub-folders.
Java engineers should be familiar with this structure. For non-java-engineers, the `main` folder contains the application and the `test` folder contains the tests for that application.
Alongside the `src` folder there is one more folder called `scripts`, which contains useful scripts for working with this project (see below).

### Caveats
Not all logic paths are tested, due to the limitation that the test data set did not allow to enter those paths, however they seemed logical to be created.
There are some comments in the code and in the tests indicating missing test scenarios (see TODO).

The CSV files are being read synchronously (blocking) from the file system, which is something that should not be done in a production app.
Either switch to a proper database or invest some time into implementing file reading and csv parsing using async and await to avoid callback hell.

The files in the `scripts` folder have only been tested on MAC OS but should generally work also for most unix distros.

The application is not production ready, it is missing proper access and exception logging as well as performance metric gathering (e.g. memory and garbage collection data).
Additionally there is currently no procedure for packaging and deployment defined in this project. 
Depending on the deployment setup it might be advisable to add [cluster support](https://nodejs.org/api/cluster.html) for this application to make better use of servers with more than one CPU.

## Setup
* install nodejs 8.12.0 (current LTS)
* run `scripts/setup`

## Start server
* run `scripts/serve`
    * will automatically re-load if a file changes
    
## Debug server
* run `scripts/debug`
    * check command line for further instructions

## Run tests
* for TDD run `scripts/watchTests`
    * will automatically re-start the tests if a file changes
    * tests (feature or specific scenario) that should run should be annotated with @dev in the feature files
* for CI or before commit/push run `scripts/allTests`

