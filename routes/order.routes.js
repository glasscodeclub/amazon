var express = require("express");
var router = express.Router();
var orderLib = require("../lib/order.lib")
var Order = require("../models/order")
var middlewares = require("../middlewares/auth");
router.get("/", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        if(ordersplaced != null){
            res.render("./pages/order", {orders: ordersplaced.orders, status:ordersplaced.status, orderDate: ordersplaced.orderDate, deliveryDate: ordersplaced.deliveryDate});
        }
        else
            res.render("./pages/order", {orders: {}});
    });
});

router.get("/viewdetails",middlewares.isLoggedIn, function(req,res){
    res.render("./pages/viewdetails");
})
module.exports = router;