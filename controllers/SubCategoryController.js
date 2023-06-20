const SubCategoryModel = require("../models/SubCategoryModel");

exports.getAllSubCategory = async (req, res) => {
  try {
    const subCategoriesData = await SubCategoryModel.find().populate("category");

    res.status(200).json({
      success: true,
      data: subCategoriesData,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
    });
  }
};

exports.getSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const dataSubCategory = await SubCategoryModel.findById(id).populate("category");

    res.status(200).json({
      success: true,
      data: dataSubCategory,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

exports.addSubCategory = async (req, res) => {
  try {
    const subCategory = new SubCategoryModel({
      name: req.body.name,
      category: req.body.category,
    });

    await subCategory.save();

    res.status(201).json({
      success: true,
      message: "Sub Kategori berhasil ditambahkan",
      data: subCategory,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.updateSubCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(id, data, { new: true }).populate("category");

    res.status(201).json({
      success: true,
      message: "Data berhasil diubah",
      data: updateSubCategory,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.deleteSubCategory = async (req, res) => {
  try {
    const id = req.params.id;

    const deleteData = await SubCategoryModel.findByIdAndDelete(id).populate("category");

    if (!deleteData) {
      res.status(404).json({
        success: false,
        message: "Data tidak ditemukan",
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
