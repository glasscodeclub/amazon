var express = require("express");
var router = express.Router();
var middlewares = require("../middlewares/auth");

router.get("/",function(req,res){
    res.redirect("/home");
});

router.get("/home",middlewares.isLoggedIn, function(req, res){
    res.render("home");
});

module.exports = router;
