const express = require('express')
const { authToken } = require('../controllers/AuthController')
const { addProduct, getAllProduct } = require('../controllers/ProductController')

const router = express.Router()

router.get('/produk', getAllProduct)
router.post('/produk', addProduct)

module.exports = router
