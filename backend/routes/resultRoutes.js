const express = require('express')
const { addResult, getResult, getResultById } = require('../controllers/resultController')
const { jwtCheck } = require('../middleware/authMiddleware')
const router = express.Router()


router.post('/:testIntroId', jwtCheck, addResult)
router.get('/', jwtCheck, getResult)
router.get('/:testIntroId', jwtCheck, getResultById)

module.exports = router 