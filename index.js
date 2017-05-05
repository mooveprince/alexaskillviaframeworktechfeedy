var Alexa = require ('alexa-sdk');
var Utility = require ('./utility.js');

const skillName = "Tech Feedy";
var supportedSites = ['Hacker News', 'Tech Crunch', 'Tech Meme'];

var handlers = {

    "GetTrendingTopics" : function () {
        var inputWebsite = this.event.request.intent.slots.website.value || "Invalid Data";
        var endPoint = Utility.getEndpoint (inputWebsite);

        if (endPoint) {
            var apiResult = Utility.getDataFromAPI (endPoint); 
            apiResult.then (data => {
                var speechText = [];
                var cardText = "";
                var includePause = "<break time='1s'/>";
                if (data) {
                    for (var topic of data) {
                        //To handle speech
                        var topicTitle = topic.title.replace(/&/g, ' and ');
                        speechText.push(`${topicTitle} ${includePause}`);

                        //To handle card
                        cardText += `${topic.title}. \n`;
                    }
                } else {
                    speechText = "Sorry something went wrong. Please try sometime later";
                    cardText = "Sorry something went wrong. Please try sometime later";
                }
                this.emit(':tellWithCard', speechText.toString(), inputWebsite, cardText);
                
            }) 
        } else {
            var speechText = `Sorry, I can only provide information for ${supportedSites}. Now, which site you would like ?`;
            var cardText = `Requested information is not available. Valid sites are ${supportedSites}`;
            var repromptText = `For instructions on what you can say, please say help me.`;

            this.emit(':askWithCard', speechText, repromptText, inputWebsite, cardText);
        }

                        

    },

    "AMAZON.StopIntent": function () {
        var speechText = "Goodbye";
        this.emit(':tell', speechText);
    },
 
    "AMAZON.CancelIntent": function () {
        var speechText = "Goodbye";
        this.emit(':tell', speechText);
    },

    "AMAZON.HelpIntent" : function () {
        var speechText = "Here are somethings you can say: ";
        speechText += " What's' trending in Hacker News.";
        speechText += " Current news in Tech Crunch.";
        speechText += " Trending topics in Tech Meme";

        this.emit(':ask', speechText, speechText);
        
    },

    "LaunchRequest" : function () {
        var speechText = `Welcome to TechFeedy. One stop for your trending topics.  
        Now, which site you would like ? ${supportedSites} `;
        var repromptText = `For instructions on what you can say, please say help me.`;

        this.emit(':ask', speechText, repromptText);
    },

    "Unhandled" : function () {
        var speechText = `Sorry, I didn\'t get that. Which site you would like ? ${supportedSites}`;
        var repromptText = `For instructions on what you can say, please say help me.`;

        this.emit(':ask', speechText, repromptText);

    }
}

exports.handler = function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.registerHandlers(handlers);
    alexa.execute();
};