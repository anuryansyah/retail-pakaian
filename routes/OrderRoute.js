const express = require('express')
const { authToken } = require('../controllers/AuthController')
const { addOrder, getAllOrder, getOrder, searchOrder } = require('../controllers/orderController')

const router = express.Router()

router.get('/order', authToken, getAllOrder)
router.get('/order/:id', authToken, getOrder)
router.get('/order-search', authToken, searchOrder)
router.post('/order', authToken, addOrder)

module.exports = router
