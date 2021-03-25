var express = require("express");
var router = express.Router();
var productLib = require("../lib/product.lib");
var categoryLib = require("../lib/category.lib");
var middlewares = require("../middlewares/auth");

router.get("/",middlewares.isLoggedIn, function(req,res){
    let cfilter={};
    categoryLib.findbyId(cfilter, function(err,categories){
        if(err){
            return res.send(err)
        }
        let filter={};
        productLib.findbyId(filter, function(err,products){
            if(err){
                return res.send(err)
            }else{
                res.render("./pages/sellerdash",{"categories":categories, "data":products});
            }
        })
    })
});

router.get("/:cat_id", middlewares.isLoggedIn, function(req,res){
    let cfilter={_id: req.params.cat_id};
    categoryLib.findbyId(cfilter, function(err,category){
        if(err){
            return res.send(err)
        }
        let filter={category: category[0].name};
        productLib.findbyId(filter, function(err,products){
            if(err){
                return res.send(err)
            }else{
                res.render("./pages/category",{data:products});
            }
        })
    })
})

module.exports = router;