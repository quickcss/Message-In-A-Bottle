"use strict";

var Nightmare = require("nightmare");

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }

 var randomText = makeid(Math.floor(Math.random() * 25) + 50);

describe("Serene Ocean Messages", function () {
    // The default tests in mocha is 2 seconds.
    // Extending it to 30 seconds to have time to load the pages

    it("Create a bottle with the message NIGHTMARE TESTING and click on the bottle then the paper.", function (done) {
        // ID for the login button.
        return Nightmare({
            show: true
        })
            .goto("http://localhost:8080/")
            // Just to be safe.
            .wait("#body")
            // Click the login button.
            .click("#body")
            // Evaluate the title
            .type("#body", randomText)
            .wait(2000)
            .click(".submit")
            .wait(".bottle")
            .click(".bottle")
            .wait(".paper")
            .click(".paper")
            .wait(2000)
            .evaluate(function () {
                return document.getElementById("burrito").innerText;
            })
            .end()
            // Asset the title is as expected
            .then(function (title) {
                expect(title).toEqual(randomText);
                done();
            });
    }, 99000);
});
