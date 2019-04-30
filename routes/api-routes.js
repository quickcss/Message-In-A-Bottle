var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
    //This checks how many bottles are stored in database and if it is less than 5 it will only try to append the amount of bottles in the database and if more than 5 grab 5 random bottles
    db.Messages.count().then(function (bottlesNumber) {
        var randomBottlesArr = [];
        var bottles = 5;
        if (bottlesNumber < 5) {
            bottles = bottlesNumber;
        };
        for (var i = 0; i < bottles; i++) {
            function randomNumGen() {
                var randomNum = Math.floor(Math.random() * bottlesNumber) + 1;
                if (randomBottlesArr.includes(randomNum)) {
                    randomNumGen();
                } else {
                    randomBottlesArr.push(randomNum);
                };
            };
            randomNumGen();
        };
        db.Messages.findAll({
            where: {
                id: randomBottlesArr
            }
        }).then(function (data) {
            //Creates random coordinates for the bottles
            for (var i = 0; i < data.length; i++) {
                data[i].randomY = Math.floor(Math.random() * 100) + 750;
                data[i].randomX = Math.floor(Math.random() * 1920);
            };
            res.render("index", {
                Messages: data
            });
        });
    });
});

router.post("/api/message", function (req, res) {
    db.Messages.create(req.body).then(function (data) {
        res.end();
    });
});

module.exports = router;