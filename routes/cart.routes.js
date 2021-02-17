var express = require("express");
var router = express.Router();
var middlewares = require("../middlewares/auth");

router.get("/",middlewares.isLoggedIn, function(req,res){
    res.render("./pages/cart");
});

module.exports = router;