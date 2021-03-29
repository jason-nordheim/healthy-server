const result = require("dotenv").config();

if (result.error) {
  throw result.error;
}

module.exports = {
  result,
};
