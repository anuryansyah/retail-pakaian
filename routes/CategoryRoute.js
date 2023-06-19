const express = require('express')
const { authToken } = require('../controllers/AuthController')
const { getAllCategory, getCategory, addCategory, updateCategory, deleteCategory } = require('../controllers/CategoryController')

const router = express.Router()

router.get('/kategori', authToken, getAllCategory)
router.get('/kategori/:id', authToken, getCategory)
router.post('/kategori', authToken, addCategory)
router.put('/kategori/:id', authToken, updateCategory)
router.delete('/kategori/:id', authToken, deleteCategory)

module.exports = router
