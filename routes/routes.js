var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middlewares = require("../middlewares/auth");

router.get("/",function(req,res){
    res.render("signup");
});

router.get("/secret",middlewares.isLoggedIn, function(req, res){
    res.render("secret");
});

router.post("/register", function(req, res){
User.register(new User({username:req.body.username}),req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render('signup');
        } //user stragety
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret"); //once the user sign up
        }); 
    });
});

router.get("/login", function(req, res){
    res.render("login");
})

router.post("/login", passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),function(req, res){
    res.send("User is "+ req.user.id);
});

router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

router.get("/home", middlewares.isLoggedIn, function(req, res){
    res.render("home");
})
module.exports = router;
