var expect = require('chai').expect;
var util = require('../utility');

describe ("Testing utility methods", function () {

    describe ("getEndpoint", function () {

        it ("should return hackernews api", function () {
            expect (util.getEndpoint ("hacker news")).to.be.equal ("https://techfeedyservice.herokuapp.com/hackernews");
        })

        it ("should return techcrunch api", function () {
            expect (util.getEndpoint ("tech crunch")).to.be.equal ("https://techfeedyservice.herokuapp.com/techcrunch");
        })

        it ("should return techmeme api", function () {
            expect (util.getEndpoint ("tech meme")).to.be.equal ("https://techfeedyservice.herokuapp.com/techmeme");
        })

        it ("should return error", function () {
            expect (util.getEndpoint ("product")).to.be.equal (false);
        })
    })

    describe ("getDataFromAPI", function () {

        it ("should return data from API", function (done) {
            expect (util.getDataFromAPI ("https://techfeedyservice.herokuapp.com/hackernews")).not.to.be.null;
            done ();
        })

    })

})