# User Manual

## High Level Description:

- What is Nicebreakers?
  - Nicebreakers is a social media for finding icebreakers

- Why do I need it?
  - If you have ever planned a social event then you know how important it is to have engaging icebreakers to break past small talk. Unfortunately, icebreakers are hard to come up with and the best you can find are just pre-compiled lists of icebreakers rather than something customized to your needs. Nicebreakers solves this problem by providing you with an interactive one-stop-shop for all your icebreaker needs.

- What does it do?
  - Nicebreakers is a website where users can post and search through uploaded icebreaker activities and questions based on a variety of filters such as age range, play time, etc... This enables you to find icebreakers that are designed for your particular event's needs.
  - Nicebreakers is a live website that enables you to see the latest icebreakers as well as your favourite classics, all in one consolidated website. It also features likes-based ranking to help you see which games are most popular with fellow users.

## How to Install Software

- All you need to use Nicebreakers is an up-to-date web-browser of your choice
- Some popular options:
  - Google Chrome, https://www.google.com/chrome/index.html
  - Mozilla Firefox, https://www.mozilla.org/en-US/firefox/new/
  - Microsoft Edge, https://www.microsoft.com/en-us/edge/download?form=MA13FJ
  - Safari (Apple Products)

- Note: Internet connectivity is needed to use Nicebreakers

## How to Run Software

- Start up your web-browser and simply visit this website:
  - https://main.d3pb2yef2pgy2m.amplifyapp.com/

- Alternatively, if you wish you can follow the "How to Build/Run System" instructions in the Developer Guidelines to run this app on a localhost port
  - Warning: this option requires extra software and authentication with the team, it is not recommended if you are not a developer

## How to Use the Software

- To use Nicebreakers simply visit this website in your web-browser:
  - https://main.d3pb2yef2pgy2m.amplifyapp.com/

- Currently you can browse, upload, and like on the platform in Guest mode
  - Once login is implemented, uploading and liking will be restricted to account holders
  - You will still be able to browse and apply filters in Guest mode
  - You can also visit https://deployable-page.d3pb2yef2pgy2m.amplifyapp.com/#/admin to view the admin page
    - Once login is implemented this will be restricted to privilaged accounts
      - While admin is public we ask that you please only remove your own posts, to avoid interfering with data and creating unexpected removals

- Upon visiting the website you will be brought to the Activities Preview Page. The design is fairly intuitive so feel free to play around and explore. Reference this documentation for a more in-depth description of each page.

- Activities Page (landing page)
  - Scroll up and down to look through activity previews. They contain:
    - Activity name
    - Endorsement badge (if applicable)
    - Activity abstract
    - Like count
    - Time duration
    - Group Size
  - Click various filter options to apply them
    - Some filters have a popup input value(s) in the format "x" or "x-y"
      - Close the popup when finished inputting
  - Outbound Pages:
    - Click on "Questions" in the top-right to view the Questions Page
    - Click on the "Upload" button in the top-right to upload an activity
    - Click on a desired activity preview to visit its full Post Page

- Questions Page
  - Scroll up and down to look through questions. They will contain:
    - Question text
    - Endorsement Badge (if applicable)
    - Like count
  - Click various filter options to apply them
    - Some filters have a popup input value(s) in the format "x" or "x-y"
      - Close the popup when finished inputting
  - Click the like button on a question to increment its like count
    - (Will be limited to one like per post when log in implemented)
  - Click the dislike button on a question to decrement its like count
      - (Will be limited to one dislike per post when log in implemented)
  - Click the report button to report this question for a violation
    - Enter a reason in the given popup box
    - Click Go Back to cancel your report and exit popup
    - Click Report to file the report and exit popup
  - Outbound Pages:
    - Click on "Activities" in the top-right to view the Activities Page
    - Click on the "Upload" button in the top-right to upload a question

- Activity Upload Page
  - Scroll up and down to view various fields
  - Input the following fields about your activity (please be appropriate and safe):
    - Activity Name
    - Abstract (for the Activities Page preview)
    - Description (for the full post page)
    - Author Name (will be prefilled when log in implemented)
    - Player count (from 1 to 99 people)
    - Duration (0 to 60 min)
    - Age range (0 to 99 years)
    - Upload photo(s) related to the activity
  - Outbound Pages:
    - Click the Back button or the Nicebreakers logo to return to the Activities Page without uploading
    - Click the upload button to upload your activity
      - (Will be limited to accounts only when log in implemented)
      - You should get an alert if you have any malformed inputs, and not be redirected
      - You should get an alert if there is an error in uploading, and not be redirected
      - You should get an alert if the activity uploaded successfully, and you will be redirected to the Activities Page

- Questions Upload Page
  - Scroll up and down to view various fields
  - Input the following fields about your question (please be appropriate and safe):
    - Question content
    - Author Name (will be prefilled when log in implemented)
    - Age range (0 to 99 years)
  - Outbound Pages:
    - Click the Back button or the Nicebreakers logo to return to the Questions Page without uploading
    - Click the upload button to upload your question
      - (Will be limited to accounts only when log in implemented)
      - You should get an alert if you have any malformed inputs, and not be redirected
      - You should get an alert if there is an error in uploading, and not be redirected
      - You should get an alert if the question uploaded successfully, and you will be redirected to the Questions Page

- Post Page (for an Activity)
  - Scroll around (if applicable) to view information about the activity. You will see:
    - Author name
    - Group Size
    - Age Range
    - Duration
    - Like count
    - Images (if applicable)
  - Click the like button to increment the like count of this activity
    - (Will be limited to one like per post when log in implemented)
  - Click the dislike button to decrement the like count of this activity
    - (Will be limited to one dislike per post when log in implemented)
  - Click the report button to report this post for a violation
    - Enter a reason in the given popup box
    - Click Go Back to cancel your report and exit popup
    - Click Report to file the report and exit popup
  - Outbound Pages:
    - Click the Nicebreakers logo to return to the Activities Page

- Report page
  - This page is not accessible through the main website
  - Scroll around to view the reported activities/questions
  - Click a post to view its contents, report message(s), and get admin options
    - Click "resolve" to reject the report(s) and keep the post up
    - Click "remove" to approve the report(s) and take down the post

## How to Report a Bug

- Go to the public nicebreakers github repository issue page: https://github.com/ngand000/nicebreakers/issues
- Click "New issue" in the top-right
- Please mark the bug with a "Bug" tag and a severity tag "Critical/Notable/Inconvenience/Negligible"
- If you have multiple bugs and can isolate them, please file them separately
- Follow the following template to help us follow-up on your bug:
  
  - Contact Info: (Optional) Please give email, phone, etc so we can contact you if needed
  
  - Bug Summary: Give a brief but specific overview of the bug. Suggested format: "A functionality on B webpage does C when input is D but I expected it to do E."
  
  - Steps to Reproduce: Please walk through all relevant steps to reproduce your bug. Try to generalize as much as possible (ex: upload png file vs upload smile-face.png) and remove any steps that are not essential to creating the bug (such as "log-in to account" if bug also appears in guest mode)
  
  - Expected Behaviour: Please detail what you expected the website to do as a result of your above steps. Can be left out if the Bug summary section covers this sufficiently.

  - Actual Behaviour: Please detail in what ways the actually observed behaviour of the website deviated from your expected behaviour. Can be left out if the Bug summary section covers this sufficiently.

  - Relevant Files: Please include any relevant files, error logs, screenshots, or other media that causes or is made by the issue

  - Machine Info: If you believe it is applicable to the issue, please include relevant technical info such as your machine make and model, operating system, web-browser, internet connection, attachments such as mouses and keyboards, etc... with version numbers if possible

- For you to copy paste easily:
  - Contact Info:
    - Email:
    - Phone:
    - Github:
  
  - Bug Summary:
    Functionality(s):
    Webpage(s):
    Input(s):
    Expected:
    Result(s):
  
  - Steps to Reproduce:
    1.
  
  - Expected Behaviour:

  - Actual Behaviour:

  - Relevant Files:
    - Screenshots
    
    - User files:

    - Error Logs:

    - Other:
  
  - Machine Info:
    
    - Make and Model:

    - Operating System:

    - Web-Browser:

    - Internet Connection:

    - External Devices:

  - Other Comments:


- For additional bug report formatting help please reference: https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html


## Known Bugs

-View the public nicebreakers github repository issue page: https://github.com/ngand000/nicebreakers/issues for any active bugs
