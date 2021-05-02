const mongoose = require("mongoose");

const requiredNum = {
  type: Number,
  required: true,
};

const FaceDataSchema = new mongoose.Schema(
  {
    user_id: requiredNum,
    expression: {
      angry: requiredNum,
      disgusted: requiredNum,
      fearful: requiredNum,
      happy: requiredNum,
      neutral: requiredNum,
    },
    count: requiredNum,
    emotion: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("face-Sentiments", FaceDataSchema);
