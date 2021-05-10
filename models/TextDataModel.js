const Joi = require("joi");
const mongoose = require("mongoose");

const textDataSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    text: { type: String, required: true },
    filename: { type: String, required: true },
    sent: { type: String, required: true },
  },
  { timestamps: true }
);

const Text = mongoose.model("text-Sentiments", textDataSchema);

//function to validate user
function validateText(user) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    text: Joi.string().required(),
    filename: Joi.string().required(),
    sent: Joi.string().required(),
  });
  return schema.validate(user);
}
//function to validate user
function validateText(user) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    text: Joi.string().required(),
    filename: Joi.string().required(),
    sent: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = { Text, validateText };
