const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  logout,
   getUser
 } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
 

// Auth Routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);
router.get('/user', authMiddleware ,getUser);


module.exports = router;
