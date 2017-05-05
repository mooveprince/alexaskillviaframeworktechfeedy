var rp = require('request-promise');

const hackerNewsEndpoint = "https://techfeedyservice.herokuapp.com/hackernews";
const techCrunchEndpoint = "https://techfeedyservice.herokuapp.com/techcrunch";
const techMemeEndpoint = "https://techfeedyservice.herokuapp.com/techmeme" ;

var getEndpoint = function (websiteName) {
    switch (websiteName && websiteName.trim().toUpperCase()) {
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
    var options = {
        uri: endpoint,
        json: true
    }

   return rp (options)
        .then (function (topics) {
            return topics;
        })
        .catch (err => {console.log ("Error in calling API " + err.statusCode); return false});
}

module.exports = {
    getEndpoint : getEndpoint,
    getDataFromAPI : getDataFromAPI
};