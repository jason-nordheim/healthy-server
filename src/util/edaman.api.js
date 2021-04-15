const axios = require("axios").default;
const {
  APP_ID,
  APP_KEY,
  FOOD_BASE_URI,
} = require("../config/edamam.api.config");

const searchFoods = (text) => {
  return axios.get(`${FOOD_BASE_URI}`, {
    params: {
      app_id: APP_ID,
      app_key: APP_KEY,
      ingr: encodeURIComponent(text),
    },
  });
};

module.exports = {
  searchFoods,
};
