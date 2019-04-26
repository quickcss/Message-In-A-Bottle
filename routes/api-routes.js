var express = require("express");
var router = express.Router();
var db = require("../models");

router.get("/", function (req, res) {
    db.Messages.findAll({}).then(function(data) {
        res.render("index", {Messages: data});
    })
});

router.post("/api/message", function (req, res) {
    console.log(req.body);
    db.Messages.create(req.body).then(function(data){
        res.end();
    })
})

module.exports = router;