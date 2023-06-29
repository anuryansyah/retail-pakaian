const express = require('express')
const { authToken } = require('../controllers/AuthController')
const { addProduct, getAllProduct, searchProduct, getProduct, updateProduct, updateStockProduct, deleteProduct } = require('../controllers/ProductController')

const router = express.Router()

router.get('/produk', authToken, getAllProduct)
router.get('/produk/:id', authToken, getProduct)
router.get('/produk-search', authToken, searchProduct)
router.post('/produk', authToken, addProduct)
router.put('/produk/:id', authToken, updateProduct)
router.put('/produk/add-qty/:id', authToken, updateStockProduct)
router.delete('/produk/:id', authToken, deleteProduct)

module.exports = router