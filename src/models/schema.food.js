const { Schema } = require("mongoose");

const foodSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, required: true }, // used to associate records
    foodId: { type: String }, // used to associate back with edaman api
    label: { type: String, required: true }, // name of food (edaman)
    category: { type: String, required: false }, // category of food (edaman)
    categoryLabel: { type: String, required: false },
    image: { type: String, required: false }, //image of food
    // defined as an object... each key code represents the
    // a defined nutrient (documentation: https://developer.edamam.com/food-database-api-docs)
    nutrients: {
      CA: { type: Number },
      CHOCDF: { type: Number },
      CHOLE: { type: Number },
      FAMS: { type: Number },
      FAPU: { type: Number },
      FASAT: { type: Number },
      FAT: { type: Number },
      FATRN: { type: Number },
      FE: { type: Number },
      FIBTG: { type: Number },
      FOLDFE: { type: Number },
      K: { type: Number },
      MG: { type: Number },
      NA: { type: Number },
      ENERC_KCAL: { type: Number },
      NIA: { type: Number },
      P: { type: Number },
      PROCNT: { type: Number },
      RIBF: { type: Number },
      SUGAR: { type: Number },
      THIA: { type: Number },
      TOCPHA: { type: Number },
      VITA_RAE: { type: Number },
      VITB12: { type: Number },
      VITB6A: { type: Number },
      VITC: { type: Number },
      VITD: { type: Number },
      VITK1: { type: Number },
    },
  },
  { timestamps: true }
);

module.exports = foodSchema;
