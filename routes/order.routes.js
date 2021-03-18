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
            res.render("./pages/order", {orders: ordersplaced.orders});
        }
        else
            res.render("./pages/order", {orders: {}});
    });
});

router.get("/viewdetails/:order_id",middlewares.isLoggedIn, function(req,res){
    var order = req.params.order_id;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == order){
                foundorder = ordersplaced.orders[i];
                break;
            }
        }  
        res.render("./pages/viewdetails",{order:foundorder});
    });
})

router.get("/cancel/:order_id", middlewares.isLoggedIn, function(req,res){
    var order = req.params.order_id;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == order){
                foundorder = ordersplaced.orders[i];
                break;
            }
        }  
        res.render("./pages/cancelorder",{order:foundorder});
    });
});

router.get("/done", middlewares.isLoggedIn, function(req,res){
    res.redirect("/order");
});

router.get("/cancel/done/:order_id", middlewares.isLoggedIn, function(req,res){
    var order = req.params.order_id;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == order){
                foundorder = ordersplaced.orders[i];
                foundorder.status = "Cancelled";
                foundorder.deliveryDate = "";
                break;
            }
        } 
        ordersplaced.save(); 
    });
    res.redirect("/order/done");
});

router.get("/return/:order_id", middlewares.isLoggedIn, function(req,res){
    var order = req.params.order_id;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == order){
                foundorder = ordersplaced.orders[i];
                break;
            }
        }  
        res.render("./pages/returnorder",{order:foundorder});
    });
});

router.get("/return/done/:order_id", middlewares.isLoggedIn, function(req,res){
    var order = req.params.order_id;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == order){
                foundorder = ordersplaced.orders[i];
                foundorder.status = "Returned";
                foundorder.deliveryDate = "";
                break;
            }
        } 
        ordersplaced.save(); 
    });
    res.redirect("/order/done");
});


module.exports = router;