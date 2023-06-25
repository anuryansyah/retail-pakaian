const express = require('express')
const { authToken } = require('../controllers/AuthController')
const { addProduct, getAllProduct, searchProduct } = require('../controllers/ProductController')

const router = express.Router()

router.get('/produk', getAllProduct)
router.post('/produk', addProduct)
router.get('/produk/search', searchProduct)

module.exports = router
