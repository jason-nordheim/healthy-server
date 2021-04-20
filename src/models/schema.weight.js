const { Schema } = require("mongoose");

const weightSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true }, // used to associate records
    source: { type: String, required: false, default: undefined },
    kg: { type: Number, required: true }, // weight in kilograms
  },
  { timestamps: true }
);

module.exports = weightSchema;
