var express = require("express");
var router = express.Router();
var productLib = require("../lib/product.lib");
var categoryLib = require("../lib/category.lib");
var middlewares = require("../middlewares/auth");
const userLib = require("../lib/user.lib");

router.get("/",middlewares.isLoggedIn, function(req,res){
    userLib.findbyId({_id: req.user._id}, function(err, user){
        if(user[0].category == "User"){
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
                        res.render("./pages/dashboard",{"categories":categories, "data":products});
                    }
                })
            })
        }else{
            res.render("./pages/sellerdash");
        }
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