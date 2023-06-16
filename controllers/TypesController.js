const TypesModel = require('../models/TypesModel')

exports.getAllTypes = async (req, res) => {
  try {
    // Ngambil semua data dari model
    const typesData = await TypesModel.find()

    res.status(200).json({
      success: true,
      data: typesData,
    })
  } catch(err) {
    res.status(500).json({
      success: false,
      message: err,
    })
  }
}

exports.getType = async (req, res) => {
  try {
    const id = req.params.id
    const typeData = await TypesModel.findById(id)

    res.status(200).json({
      success: true,
      data: typeData,
    })
  } catch(err) {
    res.status(404).json({
      success: false,
      message: 'Data tidak ditemukan',
    })
  }
}

exports.addType = async (req, res) => {
  try {
    const type = new TypesModel(req.body)

    if(await type.save()) {
      res.status(201).json({
        success: true,
        message: 'Tipe berhasil ditambahkan',
        data: type,
      })
    }

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

exports.updateType = async (req, res) => {
  try {
    const id = req.params.id
    const data = req.body

    // Validasi data
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Tolong isi semua field',
      })
    }

    // Update data
    const updateData = await TypesModel.findByIdAndUpdate(id, data, { new: true })

    if(updateData) {
      res.status(200).json({
        success: true,
        message: updateData,
      })
    }
    
  } catch (err) {
    res.status(404).json({
      success: false,
      message: 'Data tidak ditemukan',
    })
  }
}

exports.deleteType = async (req, res) => {
  try {
    const id = req.params.id

    const deleteData = await TypesModel.findByIdAndDelete(id)

    if(deleteData) {
      res.status(200).json({
        success: true,
        message: 'Type berhasil dihapus',
      })
    }
  } catch(err) {
    res.status(404).json({
      success: false,
      message: 'Data tidak ditemukan',
    })
  }
}