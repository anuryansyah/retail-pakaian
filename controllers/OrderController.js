const OrderModel = require("../models/OrderModel")
const productModel = require("../models/ProductModel")
const userModel = require("../models/UserModel")

function format(datas) {
  return datas.map((data) => {
    return {
      id: data.id,
      code: data.code,
      chasier: data.chasier.name,
      items: data.items.map((item) => {
        return {
          product: item.product.name,
          size: item.size,
          qty: item.qty,
          price: item.price,
        }
      }),
      amount: data.amount,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    }
  })
}

function formatedOne(data) {
  return {
    id: data.id,
    code: data.code,
    chasier: data.chasier.name,
    items: data.items.map((item) => {
      return {
        product: item.product.name,
        size: item.size,
        qty: item.qty,
        price: item.price,
      }
    }),
    amount: data.amount,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

exports.getAllOrder = async (req, res) => {
  try {
    const ordersData = await OrderModel.find().populate('chasier').populate('items.product')

    const formatedData = format(ordersData)

    res.status(200).json({
      success: true,
      data: formatedData,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    })
  }
}

exports.getOrder = async (req, res) => {
  try {
    const id = req.params.id
    const orderData = await OrderModel.findById(id).populate('chasier').populate('items.product')

    const formatedData = formatedOne(orderData)

    res.status(200).json({
      success: true,
      data: formatedData,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err,
    })
  }
}

exports.searchOrder = async (req, res) => {
  try {
    const { code } = req.query
    const orderData = await OrderModel.findOne({ code: code }).populate('chasier').populate('items.product')

    const formatedData = formatedOne(orderData)

    res.status(200).json({
      success: true,
      data: formatedData,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    })
  }
}

exports.addOrder = async (req, res) => {
  try {
    const { items } = req.body
    const chasierId = req.user.id
    const code = new Date().toISOString().replace(/\D/g, '')

    const product = items.map(item => item.product)
    const productSize = items.map(item => item.size)
    const productQty = items.map(item => item.qty)

    let finalItems = []
    let totalAmount = 0

    const fetchedProduct = await productModel.find({
      _id: { $in: product },
    })

    fetchedProduct.map((item, i) => {
      const qty = item.stock.filter((s) => s.size === productSize[i])
      if (!item || productQty[i] > qty[0].qty) {
        res.status(400).json({
          success: false,
          message: 'Stok produk tidak mencukupi',
        })
      }
    })

    fetchedProduct.map(async (item, i) => {
      totalAmount += (item.price * productQty[i])

      const stock = item.stock
      const qty = stock.find((size) => size.size === productSize[i])
      qty.qty -= productQty[i]

      finalItems.push({
        product: item.id,
        size: productSize[i],
        qty: productQty[i],
        price: item.price
      })

      item.save()
    })

    
    const order = new OrderModel({
      code: code,
      chasier: chasierId,
      items: finalItems,
      amount: totalAmount
    })

    order.save()

    const formatedData = formatedOne(order)

    res.status(200).json({
      success: true,
      data: formatedData,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}
