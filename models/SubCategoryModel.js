const { default: mongoose } = require("mongoose");
// panggil model Category
const categoryModel = require("./CategoryModel");

const subCategory = new mongoose.Schema(
  {
    name: { type: String, requires: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categories",
    },
  },
  { timestamps: true }
);

const subCategoryModel = mongoose.model("subCategories", subCategory);
// const categoryModel = mongoose.model("categories", category);

module.exports = subCategoryModel;
