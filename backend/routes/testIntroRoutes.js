const { getAllIntro, addIntro, deleteIntro, isActive } = require("../controllers/testIntroController");
const express = require('express');
const { jwtCheck, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router()


router.get('/', jwtCheck, getAllIntro)
router.post('/', jwtCheck, isAdmin, addIntro)
router.delete('/:id', jwtCheck, isAdmin, deleteIntro)
router.put('/:id', jwtCheck, isAdmin, isActive)

module.exports = router 