const express = require('express');
const router = express.Router();

const {
  getAllUsersFavChars,
  postUserFavChar,
  getCurrentUser,
} = require('../controllers/index');

router.get('/favs', getAllUsersFavChars);
router.get('/current', getCurrentUser);
router.post('/favchar', postUserFavChar);

module.exports = router;
