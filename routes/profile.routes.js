var express = require("express");
var router = express.Router();
// var User = require("../models/user");
var userlib = require("../lib/user.lib")
var middlewares = require("../middlewares/auth");

router.get("/", middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.user._id}
    userlib.findbyId(filter, function(err, user){
        if(err)
            console.log(err)
        res.render("./pages/profile", {users: user});
    })
});

router.post("/update", middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.user._id}
    var firstname = req.body.firstname;
        lastname = req.body.lastname;
        email = req.body.email;
        phone = req.body.phone;
        line = req.body.line;
        city = req.body.city;
        country = req.body.country;
        postal = req.body.postal;
    var address = {line, city, country, postal}
    userlib.findOne(filter, function(err, user){
        if(err)
            console.log(err)
        // user = updateduser;
        user.firstname = firstname;
        user.lastname = lastname;
        user.phone = phone;
        user.email = email;
        user.address = address;
        user.save();
        res.redirect("/profile")
    })
});

module.exports = router;