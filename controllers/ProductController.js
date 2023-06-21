const ProductModel = require('../models/ProductModel')

const populateField = ['type', 'brand', 'category', 'subCategory']

exports.getAllProduct = async (req, res) => {
  try {
    const productData = await ProductModel.find().populate(populateField)

    const formatedData = productData.map(product => {
      return {
        id: product.id,
        name: product.name,
        type: product.type.name,
        brand: product.brand.name,
        category: product.category.name,
        subCategory: product.subCategory.name,
        stock: product.stock.map(st => {
          return {
            size: st.size,
            qty: st.qty
          }
        }),
        price: product.price,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }
    })

    res.status(200).json({
      success: true,
      // data: productData
      data: formatedData,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    })
  }
}

exports.addProduct = async (req, res) => {
  try {

    const product = new ProductModel({
      name: req.body.name,
      desc: req.body.desc,
      category: req.body.category,
      type: req.body.type,
      brand: req.body.brand,
      category: req.body.category,
      subCategory: req.body.subCategory,
      stock: req.body.stock,
      price: req.body.price
    })

    await product.save()

    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: product,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}
