const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Number, required: true },
  status: { type: Number, required: true },
  products: [{
    name: { type: String },
    id: { type: String },
    quantity: { type: Number },
    price: { type: Number }
  }]
});

module.exports = mongoose.model('Cart', CartSchema);
