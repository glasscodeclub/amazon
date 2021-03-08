var async = require("async");
const Order = require("../models/order");

function findOne(filter,cb){
    Order.findOne(filter,function(err,docs){
        if(err){
            cb(err)
        }
        else{
          cb(null,docs)
        }
     });
}

module.exports={
    findOne:findOne,
}