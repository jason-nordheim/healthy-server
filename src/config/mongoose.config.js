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
  uom: { type: String, required: true, default: "imperial" },
  password_digest: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
const userModel = mongooseClient.model("user", userSchema);

const weightSchema = new mongooseClient.Schema({
  userId: { type: mongoose.Types.ObjectId, required: true }, // used to associate records
  kg: { type: Number, required: true }, // weight in kilograms
  source: { type: String, required: false, default: undefined },
  createdAt: { type: Date, default: Date.now }, // timestamp
});
const weightModel = mongooseClient.model("weight", weightSchema);

const activitySchema = new mongooseClient.Schema({
  name: { type: String, required: true }, // verbose name of activity
  // geo location
  location: {
    name: {
      type: String,
      required: false,
      default: null,
    },
    // e.g. "Running", "Walking",
    type: {
      type: String,
      required: true,
      default: null,
    },
    // e.g. "Outdoors", "Treadmill", "Trail", "Open water"
    variation: {
      type: String,
      required: false,
      default: null,
    },
    latitude: {
      type: Number,
      required: false,
      default: null,
    },
    longitude: {
      type: Number,
      required: false,
      default: null,
    },
    repetitions: {
      type: Number,
      required: false,
      default: null,
    },
    sets: {
      type: Number,
      required: false,
      default: null,
    },
    // calories burned
    calories: {
      type: Number,
      required: false,
      default: null,
    },
    // distance in kilometers
    distance: {
      type: Number,
      required: false,
      default: null,
    },
    elevation: {
      start: {
        type: Number,
        required: false,
        default: null,
      },
      end: {
        type: Number,
        required: false,
        default: null,
      },
    },
    // user-defined category for activity
    category: {
      type: String,
      required: true,
      default: null,
    },
    // when the activity is started
    startedAt: {
      type: Date,
      required: false,
      default: null,
    },
    // when the activity is completed
    completedAt: {
      type: Date,
      required: false,
      default: null,
    },
    // sub document containing heart rate information
    heartRate: {
      average: {
        type: Number,
        required: false,
        default: null,
      },
      maximum: {
        type: Number,
        required: false,
        default: null,
      },
      minimum: {
        type: Number,
        required: false,
        default: null,
      },
    },
    notes: {
      type: String,
      required: false,
      default: "",
    },
  },
  public: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: { type: Date, default: Date.now }, // timestamp
});
const activityModel = mongooseClient.model("activity", activitySchema);

mongooseClient.connect(mongo_url, connectOptions);

const connection = mongooseClient.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.info("Database Connection established");
});

module.exports = {
  models: {
    user: userModel,
    weight: weightModel,
    activity: activityModel,
  },
  connection,
};
