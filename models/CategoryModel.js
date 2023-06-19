const { default: mongoose } = require("mongoose");

const category = new mongoose.Schema({
  name: { type: String, required: true }
}, { timestamps: true })

const categoryModel = mongoose.model('categories', category)

module.exports = categoryModel