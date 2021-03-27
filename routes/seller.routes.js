var express = require("express");
var router = express.Router();
var userlib = require("../lib/user.lib")
var middlewares = require("../middlewares/auth");

router.get("/addproduct", function(req,res){
        res.render("./pages/addproduct");
});

module.exports = router;