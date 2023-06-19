const BrandModel = require("../models/BrandModel");

exports.getAllBrands = async (req, res) => {
  try {
    const brandsData = await BrandModel.find();

    res.status(200).json({
      success: true,
      data: brandsData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.getBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const brandData = await BrandModel.findById(id);

    res.status(200).json({
      success: true,
      data: brandData,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

exports.addBrand = async (req, res) => {
  try {
    const brand = new BrandModel({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });

    await brand.save();

    res.status(201).json({
      success: true,
      message: "Brand berhasil ditambahkan",
      data: brand,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateData = await BrandModel.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json({
      success: true,
      message: "Data berhasil diubah",
      data: updateData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteData = await BrandModel.findByIdAndDelete(id);

    if (!deleteData) {
      res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
        S,
      });
    }

    res.status(200).json({
      success: true,
      message: "Data berhasil dihapus",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
