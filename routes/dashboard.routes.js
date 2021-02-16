var express = require("express");
var router = express.Router();
var Product = require("../models/product");
var productLib = require("../lib/product.lib");
var middlewares = require("../middlewares/auth");

router.get("/",middlewares.isLoggedIn, function(req,res){
    let filter={};
    productLib.findbyId(filter, function(err,docs){
        if(err){
            return res.send(err)
        }else{
            // console.log(docs);
            return res.render("./pages/dashboard",{"data":docs});
        }
    })
});

module.exports = router;