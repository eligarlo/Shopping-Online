const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Number, required: true },
  status: { type: Number, required: true },
  products: [{
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    image: { type: String }
  }]
});

module.exports = mongoose.model('Cart', CartSchema);
