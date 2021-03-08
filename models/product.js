var mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
    name: String,
    imageURL: String,
    price: Number,
    stock: Number,
    description: String,
    category: String,
    discount: Number
});

module.exports = mongoose.model("Product",productSchema);