# Message-In-A-Bottle

### About
* Message in a Bottle is a simple full-stack application that allows the user to write messages and populate the ocean with bottles containing these messages
* The ocean will have no more than 5 bottles, and the messages in the bottles will be randomly selected from the database if the user sends more than 5 messages
* Technologies used: Express, Sequelize, Handlebars, SimplexNoise, and SpeechSynthesisUtterance

### Functionality
* Once the "Release the Bottle!" button is clicked
    * A POST is performed through Sequelize
    * A bottle is placed in a random location in the water
    * The message's contents are linked to that bottle with the response.id
    * The View Count, id, data-body, and bottle location are rendered in Handlebar's #bottles
* Once the bottle is clicked
    * The message's id and data-body are appended to #letter in Handlebars
* Once the scroll (unopened message) is clicked
    * The unscroll sound plays
    * The message is read with SpeechSynthesisUtterance
    * The View Count is updated with a PUT
    * The corresponding message is displayed
* If more than 5 messages are input into the database
    * We count the messages and use an if statement to check if there are less than 5 bottles
    * If so, then we display only that number of bottles on the page
    * If not, we generate a random number up to the number of messages that exist
    * If that number hasn't been previously generated, then we push that number to an array
    * Once we have 5 numbers in our array, those numbers are used to select the id's of the messages in the database
    * Those messages are then rendered to index.handlebars

### How to Use
* Type in a message into the form on the top-left corner
* Once finished with the message, click "Release the Bottle!"
* You will see a bottle appear on the screen (if not, be sure to zoom out because the application was designed for 1920 x 1080 resolution)
* Click on the bottle, and you will see a "scroll" appear on the screen
* Click on the "scroll" and your message will unravel, along with an automated voice that will read your message
* Repeat as many times as you like, and be sure to note that your messages will be randomized once you send over 5 messages
* Last but not least, be sure to click "play" in the top-right corner to hear some serene hip-hop while you write your message!

### Link to the Application
https://polar-brushlands-90360.herokuapp.com/

### Screenshot

![Message in a Bottle](/public/assets/images/screenshot/screenshot.png?raw=true "Message in a Bottle")