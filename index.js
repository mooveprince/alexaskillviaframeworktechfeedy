var Alexa = require ('alexa-sdk');
var Utility = require ('./utility.js');

const skillName = "Tech Feedy";
var supportedSites = ['Hacker News', 'Tech Crunch', 'Tech Meme'];

var handlers = {

    "GetTrendingTopics" : function () {
        var inputWebsite = event.request.intent.slots.website.value;
        var endPoint = Utility.getEndpoint (inputWebsite);

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
        speechText += "what's' trending in Hacker News";
        speechText += "current news in Tech Crunch";
        speechText += "trending topics in Tech Meme";

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