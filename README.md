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