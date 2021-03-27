var express = require("express");
var router = express.Router();
var Order = require("../models/order")
var orderLib = require("../lib/order.lib")
var cartLib = require("../lib/cart.lib");
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

router.get("/done", middlewares.isLoggedIn, function(req,res){
    res.redirect("/order");
});

router.get("/new", middlewares.isLoggedIn, function(req,res){
    let filter={owner: req.user._id };
    cartLib.findOne(filter, function(err, cart) {
        if(err)
            console.log(err);
        if(cart != null){
            orderLib.findOne(filter, function(err, ordersplaced) {
                if(err)
                    console.log(err)
                var totalPrice = cart.totalPrice,
                items = cart.items,
                payment = "Cash On Delivery",
                status = "Placed",
                tempOrderDate = new Date(),
                orderDate = tempOrderDate.toLocaleDateString(),
                tempdeliveryDate = new Date(tempOrderDate.getTime() + 172800000),
                deliveryDate = tempdeliveryDate.toLocaleDateString(),
                tempreturnDate = new Date(tempdeliveryDate.getTime() + 604800000),
                returnDate = tempreturnDate.toLocaleDateString(),
                msg = null,
                line = req.user.address.line,
                city = req.user.address.city,
                country = req.user.address.country,
                postal = req.user.address.postal,
                firstname = req.user.firstname,
                lastname = req.user.lastname,
                email = req.user.email,
                phone = req.user.phone,
                address = {line, city, country, postal, firstname, lastname, email, phone},
                order = {totalPrice, items, payment, status, orderDate, deliveryDate, returnDate, msg, address};

                if(ordersplaced != null){
                    ordersplaced.orders.push(order);
                    ordersplaced.save(); 
                }else{
                    var owner = req.user._id,
                        orders = [];
                        newuser = {owner, orders}
                    Order.create(newuser, function(err, neworder){
                        if(err)
                            console.log(err)
                        neworder.orders.push(order)
                        neworder.save()
                    })
                }
                cart.items = [];
                cart.totalPrice = 0;
                cart.save();
                res.redirect("/order/done");
            })
        }
        else
            res.redirect("/cart/shopping-cart");
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

router.post("/cancel/:order_id", middlewares.isLoggedIn, function(req,res){
    var order = req.params.order_id;
    var msg = req.body.cancelreason;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == order){
                foundorder = ordersplaced.orders[i];
                foundorder.status = "Cancelled";
                foundorder.deliveryDate = new Date().toLocaleDateString();
                foundorder.msg = msg;
                break;
            }
        } 
        ordersplaced.save(); 
    });
    res.redirect("/order/done");
});

router.get("/buyagain/:order_id", middlewares.isLoggedIn, function(req,res){
    var orderid = req.params.order_id;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == orderid){
                foundorder = ordersplaced.orders[i];
                break;
            }
        }
        var totalPrice = foundorder.totalPrice,
            items = foundorder.items,
            payment = "Cash On Delivery",
            status = "Placed",
            tempOrderDate = new Date(),
            orderDate = tempOrderDate.toLocaleDateString(),
            tempdeliveryDate = new Date(tempOrderDate.getTime() + 172800000),
            deliveryDate = tempdeliveryDate.toLocaleDateString(),
            tempreturnDate = new Date(tempdeliveryDate.getTime() + 604800000),
            returnDate = tempreturnDate.toLocaleDateString(),
            msg = null,
            address = foundorder.address,
            order = {totalPrice, items, payment, status, orderDate, deliveryDate, returnDate, msg, address};
        ordersplaced.orders.push(order);
        ordersplaced.save(); 
        res.redirect("/order/done");
    });
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

router.post("/return/:order_id", middlewares.isLoggedIn, function(req,res){
    var order = req.params.order_id;
    var msg = req.body.cancelreason;
    var foundorder;
    let filter={owner: req.user._id };
    orderLib.findOne(filter, function(err, ordersplaced) {
        if(err)
            console.log(err);
        for(var i=0;i<ordersplaced.orders.length;i++){
            if(ordersplaced.orders[i]._id == order){
                foundorder = ordersplaced.orders[i];
                foundorder.status = "Returned";
                foundorder.deliveryDate = new Date().toLocaleDateString();
                foundorder.msg = msg;
                break;
            }
        } 
        ordersplaced.save(); 
    });
    res.redirect("/order/done");
});


module.exports = router;