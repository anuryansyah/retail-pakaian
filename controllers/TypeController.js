const TypeModel = require('../models/TypeModel')

exports.getAllType = async (req, res) => {
  try {
    // Ngambil semua data dari model
    const typesData = await TypeModel.find()

    res.status(200).json({
      success: true,
      data: typesData,
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

exports.getType = async (req, res) => {
  try {
    const id = req.params.id
    const typeData = await TypeModel.findById(id)

    res.status(200).json({
      success: true,
      data: typeData,
    })
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    })
  }
}

exports.addType = async (req, res) => {
  try {
    const type = new TypeModel({
      name: req.body.name,
    })

    await type.save()

    res.status(201).json({
      success: true,
      message: 'Tipe berhasil ditambahkan',
      data: type,
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    })
  }
}

exports.updateType = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    // Update data
    const updateData = await TypeModel.findByIdAndUpdate(id, data, { new: true })

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

exports.deleteType = async (req, res) => {
  try {
    const id = req.params.id

    const deleteData = await TypeModel.findByIdAndDelete(id)

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
