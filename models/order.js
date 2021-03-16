var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
          },
  orders: [{
    totalPrice: { type: Number, default: 0},
    items: [{
      item: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
      },
      quantity: { type: Number, default: 0},
      price: { type: Number, default: 0},
      image: {type:String, default:null},
      itemname: {type:String, default:null}
    }],
    payment: {type:String, default:null},
    status: {type:String, default:null},
    orderDate: {type:String, default:null},
    deliveryDate: {type:String, default:null},
    address: {
      line:{type:String, default:null},
      city:{type:String, default:null},
      country:{type:String, default:null},
      postal:{type:String, default:null},
      firstname:{type:String, default:null},
      lastname:{type:String, default:null},
      email:{type:String, default:null},
      phone:{type:String, default:null}
    }
  }]
});

module.exports = mongoose.model('Order', orderSchema);