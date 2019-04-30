"use strict";

var Nightmare = require("nightmare");

describe("Serene Ocean Messages", function () {
    // The default tests in mocha is 2 seconds.
    // Extending it to 30 seconds to have time to load the pages
    var textbox = '#body';

    it("Create a bottle with the message NIGHTMARE TESTING and click on the bottle then the paper.", function (done) {
        // ID for the login button.
        return Nightmare({
            show: true
        })
            .goto("http://localhost:8080/")
            // Just to be safe.d
            .wait("#body")
            // Click the login button.
            .click("#body")
            // Evaluate the title
            .type("#body", "NIGHTMARE TESTING!")
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
              console.log(title);
                expect(title).toEqual("NIGHTMARE TESTING!");
                done();
            });
    }, 99000);
});
