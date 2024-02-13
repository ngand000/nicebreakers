# NiceBreakers
When planning an event and trying to find icebreaker activities to do, the best you can
find is just pre-compiled lists of icebreakers rather than something that better fits
your needs. The solution to that problem is Nicebreakers. Nicebreakers will be a website
where users post their favorite icebreaker activities and questions and can search
through the icebreakers that have been posted to the site based on different stats about
each icebreaker, so they can find one that fits their needs.

Repository Layout:
- amplify folder contains AWS information
- node_modules contains the packages used with React
- public will contain all the images and other sources we need
- src contains the JavaScript and CSS for the pages as well as our testing suite
    - within src there is a graphql folder, which manages how we push to and pull from the database
    - there is also a pages folder, containing folders for each different page on the website, which each have their respective JavaScript and CSS files

Test/Build/Start Pre-requirements:
- If you don’t already have it, Install Node.js: https://nodejs.org/en
- If you don’t already have it, Install npm (should be included with Node.js): https://www.npmjs.com/
- If you don’t already have it, Install AWS Amplify: https://docs.amplify.aws/javascript/tools/cli/start/set-up-cli/

How to Test:
- Clone the nicebreakers repository onto your local machine from the public github: https://github.com/ngand000/nicebreakers
- CD into the nicebreakers root directory and run: “amplify init”
    - If asked to login with Amplify Credentials, see a team member to get added to the Amplify Database
- Still CD’d into the nicebreakers root directory and run: “amplify pull”
    - Install any dependencies that command line may prompt you with, likely in format “npm install @amplify/[X]”
- Still CD’d in the nicebreakers root directory, run “npm test”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm test”
- A test report should be made in your command line interface
    
How to Build:
- Clone the nicebreakers repository onto your local machine from the public github: https://github.com/ngand000/nicebreakers
- CD into the nicebreakers root directory and run: “amplify init”
    - If asked to login with Amplify Credentials, see a team member to get added to the Amplify Database
- Still CD’d into the nicebreakers root directory and run: “amplify pull”
    - Install any dependencies that command line may prompt you with, likely in format “npm install @amplify/[X]”
- Still CD’d in the nicebreakers root directory, run “npm run build”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm run build”
- A /build folder should be created in your local nicebreakers repository which you can then deploy
    - Run commands: “npm install -g serve” then “serve -s build” to serve the build with a static server
    - The static site should be served on your port 3000

How to Run System:
- Clone the nicebreakers repository onto your local machine from the public github: https://github.com/ngand000/nicebreakers
- CD into the nicebreakers root directory and run: “amplify init”
    - If asked to login with Amplify Credentials, see a team member to get added to the Amplify Database
- Still CD’d into the nicebreakers root directory and run: “amplify pull”
    - Install any dependencies that command line may prompt you with, likely in format “npm install @amplify/[X]”
- Still CD’d in the nicebreakers root directory, run “npm start”
    - If it asks you to install react-scripts, do so with the given command
    - Then rerun “npm start”
- A localhost:3000 port should open on your web browser with the App rendered

Currently operational use cases:
- Viewing the main Activities Page
    - Filtering Activities based on fields
        - Group size
        - Ages
        - Duration
        - Endorsed
    - Hovering over individual activities
    - Going to individual activitiy page
    - Going to Questions Page
    - Going to Upload Activity Page
- Veiwing individual Activity page
    - Viewing filter details
    - Veiwing author name
    - Viewing activity title
    - Viewing activity description
- Viewing the main Questions Page
    - Filtering Questions based on fields
        - Ages
        - Endorsed
    - Hovering over individual questions
    - Going to Activities Page
    - Going to Upload Question Page
- Viewing Upload Activity Page
    - Entering Details of Activity
        - Entering Activity Name
        - Entering Activity Description
        - Entering Author
        - Entering Player Count min and max
        - Entering Duration min and max
        - Entering Age Range min and max
        - Uploading photos
    - Going back to Activity Page without uploading
    - Uploading Activity
        - Redirects to Activities page if successful
        - On invalid input, gives popup alert and stays on page
-Viewing Upload Question Page
    - Entering Details of Question
        - Entering Question Text
        - Entering Author
        - Entering Age Range min and max
    - Going back to Questions Page without uploading
    - Uploading Question
        - Redirects to Questions page if successful
        - On invalid input, gives popup alert and stays on page
