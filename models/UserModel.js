const Joi = require("joi");
const mongoose = require("mongoose");

//simple schema
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 255,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

//function to validate user
function validateUser(user) {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(3).max(255).required(),
  });
  return schema.validate(user);
}

module.exports = { User, validateUser };
