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
      quantity: { type: Number, default: 1},
      price: { type: Number, default: 0},
      image: String,
      itemname: String,
    }]
  }],
  isPayment: Boolean,
  status: String,
  orderDate: String,
  deliveryDate: String
});

module.exports = mongoose.model('Order', orderSchema);