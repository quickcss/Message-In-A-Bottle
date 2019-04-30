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
                return document.querySelector('#burrito').value();
            })
            .end()
            // Asset the title is as expected
            .then(function (title) {
                expect(title).toEqual("NIGHTMARE TESTING!");
                done();
            });
    }, 99000);

    // it("should present a link to course catalog after login", function (done) {
    //     return Nightmare({
    //         show: true,
    //         executionTimeout: 30000
    //     })
    //         // Visit login page
    //         .goto("https://www.codecademy.com/login")
    //         // Enter username.
    //         .type("#user_login", "ResilD")
    //         // Enter password.
    //         .type("#login__user_password", "dummy*password")
    //         // Take a screenshot of the login form.
    //         .screenshot("login.png")
    //         // Click login button. Always check if you've done this where necessary!
    //         // It's easy to forget.
    //         .click("#user_submit")
    //         .evaluate(function () {
    //             return document.querySelector('a[href="/learn"]');
    //         })
    //         .end()
    //         // Execute commands
    //         .then(function (result) {
    //             expect(result).toBeDefined();
    //             done();
    //         })
    //         // Catch errors
    //         .catch(function (err) {
    //             console.log(err);
    //             done();
    //         });
    // }, 30000);
});
