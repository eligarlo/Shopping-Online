const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const categorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

categorySchema.plugin(uniqueValidator);

module.exports = mongoose.model('Category', categorySchema);
