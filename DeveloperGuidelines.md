# Developer Guidelines

## Repository Link
- https://github.com/ngand000/nicebreakers
- To obtain source code simply run "git clone https://github.com/ngand000/nicebreakers" in the folder you want to clone the repository to

## Repository Layout:
- amplify folder contains AWS information
- node_modules contains the packages used with React
- public will contain all the images and other sources we need
- src contains the JavaScript and CSS for the pages as well as our testing suite
    - within src there is a graphql folder, which manages how we push to and pull from the database
    - there is also a pages folder, containing sub-folders for each different page on the website, which each have their respective JavaScript, CSS, and test files

## Coding guideline:
- React Style Guidelines https://airbnb.io/javascript/react/#basic-rules 
- CSS Style Guidelines https://google.github.io/styleguide/htmlcssguide.html 
- We chose both of these style guidelines because they are fairly simple but will still keep our code orderly and clean with a style that everyone on our team likes. We preferred some of the style choices in these style guidelines we found, such as when to use React classes vs functions (and not to use React.createClass). We will enforce the style by requiring pull requests to merge changes, so that another team member will always have to check your code before it’s added, and they will make sure that your code has proper style.

## How to report a Bug
- Go to the public nicebreakers github repository: https://github.com/ngand000/nicebreakers. And in the "issues" tab create a new issue in the top right. Provide a detailed description of the issue, any specifics needed to replicate it, and the relevant files/webpages that are involved in this issue.

## How to add a new test:
- In the corresponding [PageName].test.jsx (in the respective subfolder within the src/pages directory) for the page you are adding a test for, you add a new test() method with its name and a function that should run to completion without any assertion fails
    - If there is no [PageName].test.jsx file for the page you want to test, simply create one then do the above
- Use Jest with the React Testing Library for syntax and conventions, or alternatively look at our test files (ex: src\pages\activities\ActivityPreview.test.jsx)
    - Helpful Jest Documentation: https://jestjs.io/docs/tutorial-react
    - Helpful React Testing Library Resource: https://testing-library.com/docs/react-testing-library/example-intro

## Test/Build/Start Pre-requirements:
- You can technically do these anywhere and use path variables, but we recommend doing these in the nicebreakers root directory after cloning the repository for ease
    - If you don’t already have it, Install Node.js: https://nodejs.org/en
    - If you don’t already have it, Install npm (should be included with Node.js): https://www.npmjs.com/. A 64-bit version is required for Amplify
    - If you don’t already have it, Install AWS Amplify CLI: https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/

## How to Build/Run/Test System:
- For any of the three (Build/Run/Test) do the following:
- Clone the nicebreakers repository onto your local machine from the public github: https://github.com/ngand000/nicebreakers into your preferred IDE
- CD into the nicebreakers root directory and run: “amplify configure”
    - If asked to log in with Amplify Credentials, email ngand000@uw.edu to ask to get added to the Amplify Database
    - Select the option to sign in with AWS account, it should redirect you to a sign in page on your default web browser
- Still CD'd into the nicebreakers root directory and run: “amplify init”
- Still CD’d into the nicebreakers root directory and run: “amplify pull”
    - Install any dependencies that command line may prompt you with, likely in the format “npm install @amplify/[X]”
- Still in the root directory, run "npm install"
- Based on what you want to do, follow the respective directions below.

## How to Build a Release of the System:
- Make any desired changes to the code as you may wish
- Still in the root directory, run “npm run build”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm run build”
- A build folder will be created in your the respository root which is your new release
- If you wish to serve the build as a static site on a localhost port to test it out do the following:
    - CD into the nicebreakers root directory
        - Your IDE terminal may not work for this, open command prompt or its equivalent for your OS
    - Run "npm install -g serve"
    - Run "serve -s build -l WXYZ"
        Where WXYZ is the localhost port you want to serve the site on (reccomended 3000)
    - Open localhost:WXYZ on your web-browser and viola, your build is served

## How to Run System:
- Still in the root directory, run “npm start”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm start”
- A localhost:3000 port should open on your web browser with the App rendered

## How to Test:
- Still CD’d in the nicebreakers root directory, run “npm test”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm test”
- A test report should be made in your command line interface

## Continuous Integration:
- We chose Github Actions, which is built into Github, and will use the Node.js template
- Adding Github Actions is as simple as creating a .github/workflows folder in your repository and putting yml files into it to run as tests
- To Create a CI test
    - Starting at the main nicebreakers directory -> .github/workflows
    - Create a new [CIUNITNAME].yml file, or make a new entry under jobs in the existing NicebreakersCI.yml file (like Github-Actions-Default and Build-and-Run-Tests)
    - Label its name, run-name, on, and jobs field as per yml file format
        - For help look online and/or at our yml file
- To view CI build history go to our public github page -> actions
    - Here you will see a history of all of our CI workflow runs
