const express = require('express')
const { addResult, getResult } = require('../controllers/resultController')
const { jwtCheck } = require('../middleware/authMiddleware')
const router = express.Router()


router.post('/:testIntroId', jwtCheck, addResult)
router.get('/', jwtCheck, getResult)

module.exports = router 