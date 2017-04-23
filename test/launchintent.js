var expect = require('chai').expect;
var index = require('../index');
 
const context = require('aws-lambda-mock-context');
const ctx = context();

describe ("Testing a session with LaunchIntent", function () {

    var speechResponse = null
    var speechError = null

    before (function (done) {
        index.handler ({
            "session": {
                "sessionId": "SessionId.df876365-57b0-4707-b103-6d88b0f8420c",
                "application": {
                "applicationId": "amzn1.ask.skill.b8e70fdd-424d-487d-9357-087b8c237697"
                },
                "attributes": {},
                "user": {
                "userId": "amzn1.ask.account.AGKCB5I7UPC6ICHTCNIF5NVSALRFPTJZ62YLCSCVVJMUZW66YN4B2PUFKIW7H7YC2PDQACGSOQRG6IF7RE3ALSNGXSJEQ2G6R3BXMLGPUV4M6KDPYOVQSYGBOLALBXOHZWU4V3VHLBGM7EYP2FCMZEOSSGLIL6PST2OZWWOPSZN5R7TW3D7TYFE2PDDN54L4IVQ7K67OEUU325A"
                },
                "new": false
            },
            "request": {
                "type": "LaunchRequest",
                "requestId": "EdwRequestId.b0b2cb22-e625-4b1f-8b09-86feadc0d743",
                "locale": "en-US",
                "timestamp": "2017-04-22T13:41:55Z"
            },
            "version": "1.0"
        }, ctx);
        
        ctx.Promise
            .then(resp => { speechResponse = resp; done(); })
            .catch(err => { speechError = err; done(); })
    });

    describe("The response is structurally correct for Alexa Speech Services", function() {

        it('should not have errored',function() {
            expect(speechError).to.be.null
        })
 
        it('should have a version', function() {
            expect(speechResponse.version).not.to.be.null
        })
 
        it('should have a speechlet response', function() {
            expect(speechResponse.response).not.to.be.null
        })

        it('should have session attributes', function() {
            expect(speechResponse.response.sessionAttributes).not.to.be.null
        })          

        it("should have a spoken response", () => {
            expect(speechResponse.response.outputSpeech).not.to.be.null
        })

        it("should have session remain open", function() {
            expect(speechResponse.response.shouldEndSession).not.to.be.null
            expect(speechResponse.response.shouldEndSession).to.be.false
        })

    })

});