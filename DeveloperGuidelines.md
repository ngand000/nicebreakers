# Developer Guidelines

## Repository Layout:
- amplify folder contains AWS information
- node_modules contains the packages used with React
- public will contain all the images and other sources we need
- src contains the JavaScript and CSS for the pages as well as our testing suite
    - within src there is a graphql folder, which manages how we push to and pull from the database
    - there is also a pages folder, containing folders for each different page on the website, which each have their respective JavaScript and CSS files

## Coding guideline:
- React Style Guidelines https://airbnb.io/javascript/react/#basic-rules 
- CSS Style Guidelines https://google.github.io/styleguide/htmlcssguide.html 
- We chose both of these style guidelines because they are fairly simple but will still keep our code orderly and clean with a style that everyone on our team likes. We preferred some of the style choices in these above other style guidelines we found, such as when to use React classes vs functions (and not to use React.createClass). We will enforce the style by requiring pull requests to merge changes, so that another team member will always have to check your code before it’s added, and they will make sure that your code has proper style.

## How to report a Bug
- Go to the public nicebreakers github repository: https://github.com/ngand000/nicebreakers. And in the "issues" tab create a new issue in the top right. Provide a detailed description of the issue, any specifics needed to replicate it and the relevant files/webpages that are involved in this issue.

## How to add a new tests:
- In the .test.jsx file (in src directory) for the page you are adding a test for, you add a new test() with the name and a function that should run to completion without any assertion fails
    - If there is no .test.jsx file for the page you want to test, simply create one then do the above

## Test/Build/Start Pre-requirements:
- You can technically do these anywhere and use path varibles, but we reccomend doing these in the nicebreakers root directory after cloning the repository for ease
    - If you don’t already have it, Install Node.js: https://nodejs.org/en
    - If you don’t already have it, Install npm (should be included with Node.js): https://www.npmjs.com/. A 64-bit version is required for Amplify
    - If you don’t already have it, Install AWS Amplify: https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/

## How to Build/Run System:
- Clone the nicebreakers repository onto your local machine from the public github: https://github.com/ngand000/nicebreakers into your prefered IDE
- CD into the nicebreakers root directory and run: “amplify init”
    - If asked to login with Amplify Credentials, email ngand000@uw.edu to ask to get added to the Amplify Database
- Still CD’d into the nicebreakers root directory and run: “amplify pull”
    - Install any dependencies that command line may prompt you with, likely in format “npm install @amplify/[X]”
- Still in the root directory, run "npm install"
- Still in the root directory, run “npm start”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm start”
- A localhost:3000 port should open on your web browser with the App rendered

## How to Test:
- Clone the nicebreakers repository onto your local machine from the public github: https://github.com/ngand000/nicebreakers
- CD into the nicebreakers root directory and run: “amplify init”
    - If asked to login with Amplify Credentials, email ngand000@uw.edu to ask to get added to the Amplify Database
- Still CD’d into the nicebreakers root directory and run: “amplify pull”
    - Install any dependencies that command line may prompt you with, likely in format “npm install @amplify/[X]”
- Still CD’d in the nicebreakers root directory, run “npm test”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm test”
- A test report should be made in your command line interface

## Continuious Integration:
- We chose Github Actions, which is built in to Github, and will use the Node.js template
- Adding Github Actions is as simple as creating a .github/workflows folder in your repository and putting yml files into it to run as tests
- To Create a CI test
    - Starting at the main nicebreakers directory -> .github/workflows
    - Create a new [CITESTNAME].yml file
    - Label it's name, run-name, on, and jobs field as per yml file format
        - For help look online and/or at our yml files
- To view CI build history go to our public github page -> actions
    - Here you will see a history of all of our CI workflow runs
