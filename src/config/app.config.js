require("./dotenv.config");

module.exports = {
  port: process.env.NODE_ENV || 5000,
  mode: process.env.NODE_ENV || "development",
  salt_rounds: 12,
  jwt_key: process.env.JWT_PRIVATE_KEY,
  jwt_opt: {
    expiresIn: "24h",
  },
  mongo_url: process.env.MONGO_DB_URL,
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    callback_url: process.env.GOOGLE_CALLBACK_URL,
  },
};
