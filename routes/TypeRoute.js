const express = require('express')
const { getAllType, addType, getType, updateType, deleteType } = require('../controllers/TypeController')
const { authToken } = require('../controllers/AuthController')

const router = express.Router()

router.get('/tipe', authToken, getAllType)
router.get('/tipe/:id', authToken, getType)
router.post('/tipe', authToken, addType)
router.put('/tipe/:id', authToken, updateType)
router.delete('/tipe/:id', authToken, deleteType)

module.exports = router
