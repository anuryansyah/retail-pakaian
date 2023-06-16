const express = require('express')
const { getAllTypes, addType, getType, updateType, deleteType } = require('../controllers/TypesController')

const router = express.Router()

router.get('/tipe', getAllTypes)
router.get('/tipe/:id', getType)
router.post('/tipe', addType)
router.put('/tipe/:id', updateType)
router.delete('/tipe/:id', deleteType)

module.exports = router
