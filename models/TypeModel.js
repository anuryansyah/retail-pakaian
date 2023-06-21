const { default: mongoose } = require("mongoose");

const type = new mongoose.Schema(
  { name: { type: String, required: true } }, 
  { timestamps: true }
)

const typeModel = mongoose.model("types", type);

module.exports = typeModel;
