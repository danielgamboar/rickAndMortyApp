const express = require('express');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.options('*', cors());

const authRoutes = require('./auth');
const characterRoutes = require('./characters');
const usersRoutes = require('./users');
const authMiddleware = require('../helpers/authMiddleware');

router.use('/auth', authRoutes);

router.use('/characters', authMiddleware, characterRoutes);
router.use('/users', authMiddleware, usersRoutes);

module.exports = router;
