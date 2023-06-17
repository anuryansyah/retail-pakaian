const express = require('express')
const { register, login, getUser, authToken } = require('../controllers/AuthController')

const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/user', authToken, getUser)

module.exports = router
