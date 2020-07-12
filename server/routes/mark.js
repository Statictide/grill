var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("script", {title: "Mark", message: "Hey there"});
});

module.exports = router;