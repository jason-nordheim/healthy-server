const axios = require("axios").default;

const FOOD_BASE_URI = "https://api.edamam.com/api/food-database/v2/parser";
const APP_ID = process.env.FOOD_API_APP_ID;
const APP_KEY = process.env.FOOD_API_APP_KEY;

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
