const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
  identityDocument: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, uniqueCaseInsensitive: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  street: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  // If you want to create another admin, you have to change this value to 1 or change the frontend
  role: {type: Number, default: 2 }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
