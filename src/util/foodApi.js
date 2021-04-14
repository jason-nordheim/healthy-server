const axios = require("axios").default;

const HEADER_API_KEY = "Ocp-Apim-Subscription-Key";
const HEADER_API_VALUE = process.env.FOOD_API_PRIMARY_KEY;
const servers = [
  {
    url: "http://nutrition-api.esha.com",
  },
  {
    url: "https://nutrition-api.esha.com",
  },
];

const UNITS = {
  CALORIES: {
    unit: "kcal",
    unitId: "urn:uuid:a7df0af5-edb2-0002-7484-751e8eaf05c6",
  },
  PROTEIN: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  CARBOHYDRATES: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  DIETARY_FIBER: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  SOLUBLE_FIBER: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  INSOLUBLE_FIBER: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  SUGAR: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  FAT: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  SATURATED_FAT: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  MONO_FAT: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  POLY_FAT: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  CHOLESTEROL: {
    unit: "mg",
    unitId: "urn:uuid:9eda6d41-4fbb-4a97-b046-46aee8a086de",
  },
  SODIUM: {
    unit: "mg",
    unitId: "urn:uuid:9eda6d41-4fbb-4a97-b046-46aee8a086de",
  },
  UNSATURATED_FAT: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
  SALT: {
    unit: "g",
    unitId: "urn:uuid:d3be684c-ebfa-4861-924f-8840600d1e84",
  },
};

const DEFAULT_SERVER = servers[1].url;
const DEFAULT_HEADERS = {
  Accept: "application/json",
  [HEADER_API_KEY]: HEADER_API_VALUE,
};
const ANALYSIS_HEADERS = {
  "Content-Type": "application/vnd.com.esha.data.Foods+json",
  Accept: "application/json",
  [HEADER_API_KEY]: HEADER_API_VALUE,
};

const searchFoods = (
  searchString,
  start = null,
  count = null,
  spell = true
) => {
  if (!searchString || searchString.length < 3) {
    throw new Error("Invalid Search String");
  }
  let url = `${DEFAULT_SERVER}/foods`;
  return axios.get(url, {
    headers: DEFAULT_HEADERS,
    params: {
      query: searchString,
      start,
      count,
      spell,
    },
  });
};

const getFood = (foodUrl) => {
  let url = `${DEFAULT_SERVER}/food/${foodUrl}`;
  return axios.get(url, {
    headers: DEFAULT_HEADERS,
  });
};

const analyzeFoods = (foods = []) => {
  // let url `${DEFAULT_SERVER}/analysis/`
};

module.exports = {
  searchFoods,
  getFood,
};
