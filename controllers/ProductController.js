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

exports.searchProduct = async (req, res) => {
  try {
    const query = req.query
    let data
  
    if (query.nama) {
      data = await ProductModel.find({name:{$regex: query.nama, $options: 'i'}}).populate(populateField)
    } else if (query.kategori) {
      data = await ProductModel.find({category: query.kategori}).populate(populateField)
    } else {
      data = 'data tidak ditemukan'
    }  

    const formatedData = format(data)
  
    res.json({
      query,
      data: formatedData,
    })

  } catch(err) {
    res.status(404).json({
      success: false,
      message: err.message,
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
