var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
  owner: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
          },
  orders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
  }],
  isPayment: Boolean,
  status: String,
  orderDate: Date,
  deliveryDate: Date
});

module.exports = mongoose.model('Order', orderSchema);