var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/signup", function(req, res){
    res.render("signup");
})
router.post("/signup", function(req, res){
User.register(new User({username:req.body.username}),req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('signup');
        } //user stragety
        passport.authenticate("local")(req, res, function(){
            res.redirect("/home"); //once the user sign up
        }); 
    });
});

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local",{
    successRedirect:"/home",
    failureRedirect:"/login"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});
module.exports = router;