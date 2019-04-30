var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
    db.Messages.count().then(function (bottlesNumber) {
        var randomBottlesArr = [];
        var bottles = 5;
        if (bottlesNumber < 5) {
            bottles = bottlesNumber;
        }
        for (var i = 0; i < bottles; i++) {
            function randomNumGen() {
                var randomNum = Math.floor(Math.random() * bottlesNumber) + 1
                if (randomBottlesArr.includes(randomNum)) {
                    randomNumGen();
                } else {
                    randomBottlesArr.push(randomNum);
                }
            }
            randomNumGen();
        }
        db.Messages.findAll({
            where: {
                id: randomBottlesArr
            }
        }).then(function (data) {
            for (var i = 0; i < data.length; i++) {
                data[i].randomY = Math.floor(Math.random() * 100) + 750;
                data[i].randomX = Math.floor(Math.random() * 1920);
                // randomArrX.push(Math.floor(Math.random() * 1920));
            }
            console.log(data);
            res.render("index", {
                Messages: data
            });
        })
    })
});

router.post("/api/message", function (req, res) {
    console.log(req.body);
    db.Messages.create(req.body).then(function (data) {
        res.end();
    });
});



module.exports = router;