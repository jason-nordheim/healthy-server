const { Schema } = require("mongoose");

const exerciseSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: 3,
      required: true,
    },
    category: { type: String, default: null }, // e.g. "treadmill"
    duration: { type: Number, required: true }, // seconds
    minElevation: { type: Number, default: null }, // meters
    maxElevation: { type: Number, default: null }, // meters
    minHeart: { type: Number },
    maxHeart: { type: Number },
    avgHeart: { type: String },
    location: { type: String, default: null },
    calories: { type: Number, default: null },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = exerciseSchema;
