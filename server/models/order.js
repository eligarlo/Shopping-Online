const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema({
  userId: { type: String, required: true },
  cartId: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  city: {type: String, required:true},
  street: {type: String, required: true},
  orderDate: {type: Date, required: true},
  deliveryDate: {type: Date, required: true},
  creditCard: { type: Number,required: true}
});

module.exports = mongoose.model("Order", OrderSchema);
