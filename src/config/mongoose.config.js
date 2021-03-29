const mongoose = require("mongoose");
const { mongo_url } = require("./app.config");

const connectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};
const mongooseClient = new mongoose.Mongoose();

const userSchema = new mongooseClient.Schema({
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
  password_digest: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});
const userModel = mongooseClient.model("user", userSchema);

mongooseClient.connect(mongo_url, connectOptions);

const connection = mongooseClient.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.info("Database Connection established");
});

module.exports = {
  models: {
    user: userModel,
  },
  connection,
};
