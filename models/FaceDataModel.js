const Joi = require("joi");
const mongoose = require("mongoose");

const requiredNum = {
  type: Number,
  required: true,
};

const FaceDataSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    expression: {
      angry: requiredNum,
      disgusted: requiredNum,
      fearful: requiredNum,
      happy: requiredNum,
      neutral: requiredNum,
      sad: requiredNum,
      surprised: requiredNum,
    },
    count: requiredNum,
    emotion: { type: String, required: true },
  },
  { timestamps: true }
);

const Face = mongoose.model("face-Sentiments", FaceDataSchema);

//function to validate user
function validateFace(user) {
  const schema = Joi.object({
    user_id: Joi.string().required(),
    expression: {
      angry: Joi.number().required(),
      disgusted: Joi.number().required(),
      fearful: Joi.number().required(),
      happy: Joi.number().required(),
      neutral: Joi.number().required(),
      sad: Joi.number().required(),
      surprised: Joi.number().required(),
    },
    count: Joi.number().required(),
    emotion: Joi.string().required(),
  });
  return schema.validate(user);
}

module.exports = { Face, validateFace };
