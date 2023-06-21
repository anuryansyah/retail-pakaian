const express = require("express");
const { authToken } = require("../controllers/AuthController");

const { getAllSubCategory, getSubCategory, addSubCategory, updateSubCategory, deleteSubCategory } = require("../controllers/SubCategoryController");

const router = express.Router();

router.get("/sub-kategori", authToken, getAllSubCategory);
router.get("/sub-kategori/:id", authToken, getSubCategory);
router.post("/sub-kategori", authToken, addSubCategory);
router.put("/sub-kategori/:id", authToken, updateSubCategory);
router.delete("/sub-kategori/:id", authToken, deleteSubCategory);

module.exports = router;
