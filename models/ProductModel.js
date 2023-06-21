const { default: mongoose } = require('mongoose')

const stockSchema = new mongoose.Schema({
  size: String,
  qty: Number,
})

const product = new mongoose.Schema(
  {
    name: { type: String, required: true },
    desc: { type: String, required: true },
    type: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'types',
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'brands',
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categories',
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'subCategories',
    },
    stock: [stockSchema],
    price: { type: Number, required: true },
  },
  { timestamps: true }
)

const productModel = mongoose.model('products', product)

module.exports = productModel
