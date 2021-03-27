var express = require("express");
var router = express.Router();
var userlib = require("../lib/user.lib")
var middlewares = require("../middlewares/auth");
const Product = require("../models/product");

router.get("/addproduct",middlewares.isLoggedIn, function(req,res){
        res.render("./pages/addproduct");
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

module.exports = router;