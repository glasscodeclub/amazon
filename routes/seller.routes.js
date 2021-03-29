var express = require("express");
var router = express.Router();
var categoryLib = require("../lib/category.lib");
var middlewares = require("../middlewares/auth");
const Product = require("../models/product");
var productLib = require("../lib/product.lib");

router.get("/profile",middlewares.isLoggedIn, function(req,res){
    res.render("./pages/sellerprofile");
});

router.get("/addproduct",middlewares.isLoggedIn, function(req,res){
    let filter={};
    categoryLib.findbyId(filter, function(err,categories){
        if (err)
            console.log(err)
        res.render("./pages/addproduct", {categories: categories});
    })
});

router.post("/addproduct",middlewares.isLoggedIn, function(req,res){
        var name = req.body.name,
            imageURL = req.body.imageURL,
            price = req.body.price,
            stock = req.body.stock,
            description = req.body.description,
            category = req.body.category,
            discount = req.body.discount,
            seller = req.user._id
        var newproduct = {name, imageURL, price, stock, description, category, discount, seller}
        Product.create(newproduct, function(err, newproduct){
            if(err)
                console.log(err);
            res.redirect("/dashboard");
        })
});

router.get("/products",middlewares.isLoggedIn, function(req,res){
    let filter = {seller: req.user._id };
    productLib.findbyId(filter, function(err, products){
        if(err)
            console.log(err);
        else if(products.length > 0)
            res.render("./pages/inventory",{products: products});
        else
            res.render("./pages/inventory",{products: []});
    })
});

router.get("/products/:product_id/update",middlewares.isLoggedIn, function(req,res){
    let filter = {_id: req.params.product_id };
    productLib.findOne(filter, function(err, product){
        let cfilter = {};
        categoryLib.findbyId(cfilter, function(err,categories){
            if (err)
                console.log(err)
            res.render("./pages/Update",{product:product, categories:categories});
        })
    })
});

router.post("/products/:product_id",middlewares.isLoggedIn, function(req,res){
    Product.findByIdAndUpdate(req.params.product_id,req.body.product,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/seller/products");
        }
    })
});

router.delete("/products/:product_id",middlewares.isLoggedIn,function(req,res){
    Product.findByIdAndRemove(req.params.product_id,function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/seller/products");
        }
    })
})

module.exports = router;