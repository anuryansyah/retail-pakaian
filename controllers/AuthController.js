const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userModel = require('../models/UserModel')

exports.authToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    res.status(401).json({
      success: false,
      message: 'Login terlebih dulu',
    })
  }

  jwt.verify(token, 'arisda', (err, user) => {
    if (err) {
      res.status(403).json({
        success: false,
        message: err,
      })
    }

    req.user = user
    next()
  })
}

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body
  
    const existingUser = await userModel.findOne({ email })
  
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email sudah digunakan',
      })
    }
  
    const hashedPassword = bcrypt.hashSync(password, 12)

    const user = new userModel({ name, email, password: hashedPassword })
    user.save()

    res.status(200).json({
      success: true,
      message: 'User berhasil dibuat',
      data: user
    })

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.find({email})
    const resultCheck = user.some(x => bcrypt.compareSync(password, x.password))

    if (resultCheck) {
      const token = jwt.sign({ id: user[0].id }, 'arisda', { expiresIn: 10000 })

      res.status(200).json({
        success: true,
        message: 'Login berhasil',
        token,
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Email atau password salah'
      })
    }

  } catch(err) {
    res.status(500).json({
      success: false,
      message: err.message,
    })
  }
}

exports.getUser = async (req, res) => {
  const id = req.user.id
  const user = await userModel.findById(id)
  
  res.send(user)
}