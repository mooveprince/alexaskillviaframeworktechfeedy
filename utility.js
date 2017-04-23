var https = require ('https');

const hackerNewsEndpoint = "https://techfeedyservice.herokuapp.com/hackernews";
const techCrunchEndpoint = "https://techfeedyservice.herokuapp.com/techcrunch";
const techMemeEndpoint = "https://techfeedyservice.herokuapp.com/techmeme" ;

var getEndpoint = function (websiteName) {
    switch (websiteName.trim().toUpperCase()) {
        case "HACKER NEWS":
            return hackerNewsEndpoint;      
        case "TECH MEME" :
            return techMemeEndpoint;
        case "TECH CRUNCH" :
            return techCrunchEndpoint;
        default:
            return false;
    }
}

var getDataFromAPI = function (endpoint) {
    var body = '';

    var promise = new Promise ((resolve, reject) => {
        https.get (endpoint, (response) => {
            response.on ('data', (chunk) => { body += chunk});
            response.on ('end', () => { 
                topics = JSON.parse (body);
                console.log ("Topics in promise");
                resolve (topics);
            })
        });
    });

    promise.then (topics => { console.log ("Topics in resolved") ;return topics});

}

module.exports = {
    getEndpoint : getEndpoint,
    getDataFromAPI : getDataFromAPI
};