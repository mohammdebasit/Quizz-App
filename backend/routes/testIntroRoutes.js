const { getAllIntro, addIntro, deleteIntro } = require("../controllers/testIntroController");
const express = require('express');
const { jwtCheck, isAdmin } = require("../middleware/authMiddleware");
const router = express.Router()


router.get('/', jwtCheck, getAllIntro)
router.post('/', jwtCheck, isAdmin, addIntro)
router.delete('/:id', jwtCheck, isAdmin, deleteIntro)

module.exports = router 