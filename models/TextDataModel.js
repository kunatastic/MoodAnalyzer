const Joi = require("joi");
const mongoose = require("mongoose");

const requiredString = { type: String, required: true };
const requiredNumber = { type: Number, required: true };

const textDataSchema = new mongoose.Schema(
  {
    user_id: requiredString,
    text: requiredString,
    filename: requiredString,
    sent: requiredString,
    AWS: {
      Sentiment: requiredString,
      SentimentScore: {
        Positive: requiredNumber,
        Negative: requiredNumber,
        Neutral: requiredNumber,
        Mixed: requiredNumber,
      },
    },
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
    AWS: {
      Sentiment: Joi.string().required(),
      SentimentScore: {
        Positive: Joi.number().required(),
        Negative: Joi.number().required(),
        Neutral: Joi.number().required(),
        Mixed: Joi.number().required(),
      },
    },
  });
  return schema.validate(user);
}

module.exports = { Text, validateText };
