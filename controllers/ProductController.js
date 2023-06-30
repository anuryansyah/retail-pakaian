const ProductModel = require('../models/ProductModel')

const populateField = ['type', 'brand', 'category', 'subCategory']

function format(datas) {
  return datas.map(data => {
    return {
      id: data.id,
      name: data.name,
      desc: data.desc,
      type: data.type.name,
      brand: data.brand.name,
      category: data.category.name,
      subCategory: data.subCategory.name,
      stock: data.stock.map(st => {
        return {
          size: st.size,
          qty: st.qty
        }
      }),
      price: data.price,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt
    }
  })
}

function formatOne(data) {
  return {
    id: data.id,
    name: data.name,
    desc: data.desc,
    type: data.type.name,
    brand: data.brand.name,
    category: data.category.name,
    subCategory: data.subCategory.name,
    stock: data.stock.map((st) => {
      return {
        size: st.size,
        qty: st.qty,
      }
    }),
    price: data.price,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
  }
}

exports.getAllProduct = async (req, res) => {
  try {
    const productData = await ProductModel.find().populate(populateField)

    const formatedData = format(productData)

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

exports.getProduct = async (req, res) => {
  try {
    const id = req.params.id
    const productData = await ProductModel.findById(id).populate(populateField)

    const formatedData = formatOne(productData)

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

exports.searchProduct = async (req, res) => {
  try {
    const query = req.query
    let data
    
    if (query.name) {
      data = await ProductModel.find({name:{$regex: query.name, $options: 'i'}}).populate(populateField)
    } else if (query.type) {
      data = await ProductModel.find({ type: query.type }).populate(populateField)
    } else if (query.brand) {
      data = await ProductModel.find({ brand: query.brand }).populate(populateField)
    } else if (query.category) {
      data = await ProductModel.find({ category: query.category }).populate(populateField)
    } else if (query.subCategory) {
      data = await ProductModel.find({ subCategory: query.subCategory }).populate(populateField)
    } else {
      data = 'data tidak ditemukan'
    }  

    const formatedData = format(data)
  
    res.json({
      success: true,
      data: formatedData,
    })

  } catch(err) {
    res.status(404).json({
      success: false,
      message: 'asd',
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

    const productData = await ProductModel.findById(product._id).populate(populateField)

    const formatedData = formatOne(productData)

    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: formatedData,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}


exports.updateProduct = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    // Update data
    const updateData = await ProductModel.findByIdAndUpdate(id, data, { new: true })

    res.status(201).json({
      success: true,
      message: 'Data berhasil diubah',
      data: updateData,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}


exports.updateStockProduct = async (req, res) => {
  try {
    const id = req.params.id
    const { size, qty } = req.body

    const product = await ProductModel.findById(id).populate(populateField)

    const newQty = product.stock.find((stock) => stock.size === size)

    if (newQty) {
      newQty.qty += qty
    }

    product.save()

    const formatedData = formatOne(product)

    res.status(201).json({
      success: true,
      message: 'Data berhasil diubah',
      data: formatedData,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id

    const deleteData = await ProductModel.findByIdAndDelete(id)

    if (!deleteData) {
      res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil dihapus',
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}