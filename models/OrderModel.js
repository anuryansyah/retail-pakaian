const { default: mongoose } = require('mongoose')

const itemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'products' },
  size: String,
  qty: Number,
  price: Number,
})

const Order = new mongoose.Schema(
  {
    code: { type: String, requires: true },
    chasier: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    items: [itemSchema],
    amount: Number,
  },
  { timestamps: true }
)

const OrderModel = mongoose.model('orders', Order)

module.exports = OrderModel
