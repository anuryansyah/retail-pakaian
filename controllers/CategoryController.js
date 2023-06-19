const CategoryModel = require('../models/CategoryModel')

exports.getAllCategory = async (req, res) => {
  try {
    const categoriesData = await CategoryModel.find()

    res.status(200).json({
      success: true,
      data: categoriesData,
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err,
    })
  }
}

exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id
    const categoryData = await CategoryModel.findById(id)

    res.status(200).json({
      success: true,
      data: categoryData,
    })
  } catch(err) {
    res.status(404).json({
      success: false,
      message: err.message,
    })
  }
}

exports.addCategory = async (req, res) => {
  try {
    const category = new CategoryModel({
      name: req.body.name
    })

    await category.save()

    res.status(201).json({
      success: true,
      message: 'Kategori berhasil ditambahkan',
      data: category,
    })
  } catch(err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    // Update data
    const updateData = await CategoryModel.findByIdAndUpdate(id, data, { new: true })

    res.status(201).json({
      success: true,
      message: 'Data berhasil diubah',
      data: updateData
    })    
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    const id = req.params.id

    const deleteData = await CategoryModel.findByIdAndDelete(id)

    if(!deleteData) {
      res.status(404).json({
        success: false,
        message: 'Data tidak ditemukan',
      })
    }

    res.status(200).json({
      success: true,
      message: 'Data berhasil dihapus',
    })

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}