var express = require("express");
var router = express.Router();
var Product = require("../models/product");

router.get("/", function(req,res){
    Product.find({},(function(err,products){
        if(err){
            console.log("error");
        }
        else{
            res.render("home",{data:products});
        }
    })
    )
});

module.exports = router;
