const express = require('express');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.options('*', cors());

const authRoutes = require('./auth');
// const characterRoutes = require('./characters');
const { getAllCharacters, getCharacterById } = require('../controllers/index');
const usersRoutes = require('./users');
const authMiddleware = require('../helpers/authMiddleware');

router.use('/auth', authRoutes);

// router.use('/characters', authMiddleware, characterRoutes);
router.get('/characters/:page', getAllCharacters);
router.get('/char/:id', authMiddleware, getCharacterById);
router.use('/user', authMiddleware, usersRoutes);

module.exports = router;
