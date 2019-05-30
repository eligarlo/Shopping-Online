const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const productSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }
});

productSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Product', productSchema);
