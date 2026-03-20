const express = require('express')
const { addMcq, deleteMcq, getAllMcqByid } = require('../controllers/mcqController')
const { jwtCheck, isAdmin } = require('../middleware/authMiddleware')
const router = express.Router()


router.get('/:id', getAllMcqByid)
router.post('/:introId', jwtCheck, isAdmin, addMcq)
router.delete('/:id', jwtCheck, isAdmin, deleteMcq)

module.exports = router 