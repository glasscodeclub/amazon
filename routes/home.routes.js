var express = require("express");
var router = express.Router();
var Product = require("../models/product");

var products = [{
        name : "T-shirt",
        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6O0WzE2pxm3jPp_P_M1fDrdv4jKSJ82vA5sID1IkkrbYntHK6F6XBwN7Z9_Cwy0tce0K1MK69Q&usqp=CAc",
        price : 300,
        stock : 1000,
        description : "t-shirt for men"
    },
    {
        name : "Apple Watch",
        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1fQhXXgxgQPjw2K5_lOhWNPXy3gX6Zoamn4uFRA_qa61ECuLUItzH0MieLfeaFgAunL6sv7T&usqp=CAc",
        price : 30000,
        stock : 100,
        description : "New iwatch from Apple"
    },
    {
        name : "T-shirt",
        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSw6O0WzE2pxm3jPp_P_M1fDrdv4jKSJ82vA5sID1IkkrbYntHK6F6XBwN7Z9_Cwy0tce0K1MK69Q&usqp=CAc",
        price : 300,
        stock : 1000,
        description : "t-shirt for men"
    },
    {
        name : "Apple Watch",
        imageURL : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ1fQhXXgxgQPjw2K5_lOhWNPXy3gX6Zoamn4uFRA_qa61ECuLUItzH0MieLfeaFgAunL6sv7T&usqp=CAc",
        price : 30000,
        stock : 100,
        description : "New iwatch from Apple"
    }
];
for(var i=0;i<products.length; i++){
    Product.create(products[i],function(err,newproduct){
        if(err){
            console.log(err);
        }else{
            console.log(newproduct);
        }
    });
}

router.get("/", function(req,res){
    Product.find({},(function(err,products){
        if(err){
            console.log("error");
        }
        else{
            res.render("./pages/home",{data:products});
        }
    })
    )
});

module.exports = router;
