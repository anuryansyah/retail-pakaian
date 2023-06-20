const express = require("express");
const { authToken } = require("../controllers/AuthController");

const { getAllSubCategory, getSubCategory, addSubCategory, updateSubCategory, deleteSubCategory } = require("../controllers/SubCategoryController");

const router = express.Router();

router.get("/subcategory", authToken, getAllSubCategory);
router.get("/getSubCategory/:id", authToken, getSubCategory);
router.post("/subcategory", authToken, addSubCategory);
router.put("/updateSubCategory/:id", authToken, updateSubCategory);
router.delete("/deleteSubCategory/:id", authToken, deleteSubCategory);

module.exports = router;
