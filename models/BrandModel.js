const { default: mongoose } = require("mongoose");

const brand = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

brandModel = mongoose.model("brands", brand);

module.exports = brandModel;
