const express = require("express");
const { authToken } = require("../controllers/AuthController");

const { getAllBrand, addBrand, getBrand, updateBrand, deleteBrand } = require("../controllers/BrandController");

const router = express.Router();

router.get("/brand", authToken, getAllBrand);
router.get("/brand/:id", authToken, getBrand);
router.post("/brand", authToken, addBrand);
router.put("/brand/:id", authToken, updateBrand);
router.delete("/brand/:id", authToken, deleteBrand);

module.exports = router;
