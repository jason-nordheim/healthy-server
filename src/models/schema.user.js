const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    first: { type: String, required: true }, // first name
    last: { type: String, required: true }, // last name
    day: { type: Number, required: true }, // birth day
    month: { type: Number, required: true }, // birth month
    year: { type: Number, required: true }, // birth year
    height: { type: Number, required: false }, // height in centimeters
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (val) => {
        return /^[^@]+@\w+(\.\w+)+\w$/.test(val);
      },
    },
    uom: { type: String, required: true, default: "imperial" },
    password_digest: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = userSchema;
