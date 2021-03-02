var express = require("express");
var router = express.Router();
var productLib = require("../lib/product.lib");
var middlewares = require("../middlewares/auth");

router.get("/",middlewares.isLoggedIn, function(req,res){
    var name = req.query.search;
    let filter = {name:{$regex: name, $options: '$i'}};
    productLib.findbyId(filter, function(err, products){
        if(err)
            console.log(err);
        res.render("./pages/search", {products: products});
    })    
});

module.exports = router;