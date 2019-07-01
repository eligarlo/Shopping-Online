const mongoose = require("mongoose");

const DeliveryDateSchema = mongoose.Schema({
  date: { type: Date, required: true },
  orders: [{
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", required: true
    }
  }]
});

module.exports = mongoose.model('DeliveryDate', DeliveryDateSchema);
