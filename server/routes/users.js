const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  postUserFavChar,
  deleteUserFavChar,
} = require('../controllers/index');

router.get('/', getAllUsers);
router.post('/favchar', postUserFavChar);
router.delete('/favchar', deleteUserFavChar);

module.exports = router;
