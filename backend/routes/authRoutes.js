const express = require('express')
const { Register, login } = require('../controllers/authUserController')
const router = express.Router()


router.post('/register', Register)
router.post('/login', login)

module.exports = router 