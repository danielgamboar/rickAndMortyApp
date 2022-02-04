const express = require('express');
const router = express.Router();

const { getAllUsers, postUserFavChar } = require('../controllers/index');

router.get('/', getAllUsers);
router.post('/favchar', postUserFavChar);

module.exports = router;
