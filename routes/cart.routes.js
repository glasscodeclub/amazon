var express = require("express");
var router = express.Router();
var middlewares = require("../middlewares/auth");
var Cart = require("../models/cart")
var Product = require("../models/product");

router.get("/add/:id",middlewares.isLoggedIn, function(req,res){
    var productID = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    Product.findById(productID, function(err, product){
        if(err)
            console.log(err);
        cart.add(product, product.id, product.imageURL, product.name);
        req.session.cart = cart;
        res.redirect("/dashboard");
        console.log(req.session.cart);
    })
});

router.get("/shopping-cart", middlewares.isLoggedIn, function(req,res){
    if(!req.session.cart)
        return res.render("./pages/cart",{products: null});
    var cart = new Cart(req.session.cart);
    res.render("./pages/cart", {products: cart.generateArray(), totalPrice: cart.totalPrice});
})
module.exports = router;