const express = require("express");

const { getAllBrands, addBrand, getBrand, updateBrand, deleteBrand } = require("../controllers/BrandController");

const router = express.Router();

router.get("/brand", getAllBrands);
router.get("/brand/:id", getBrand);
router.post("/brand", addBrand);
router.put("/brand/:id", updateBrand);
router.delete("/brand/:id", deleteBrand);

module.exports = router;
