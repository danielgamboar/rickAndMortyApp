const express = require('express');
const router = express.Router();
const { getAllCharacters, getCharacterById } = require('../controllers/index');

router.get('/', getAllCharacters);
router.get('/:id', getCharacterById);

module.exports = router;
