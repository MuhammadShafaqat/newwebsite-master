const express = require('express');
const router = express.Router();
const {
  signup,
  signin,
  logout,
   getUser,
   getAllUsers,
   updateUser
 } = require('../controllers/authController');
 
const {createOrUpdateKey, getKeyInfo} = require('../controllers/registrationKeyController');
const { authMiddleware,  adminMiddleware} = require('../middlewares/authMiddleware');
 

// Auth Routes
router.post('/signup', signup);
router.post('/signin', signin);
router.post('/logout', logout);
router.get('/user', adminMiddleware ,getUser);
router.get('/users', adminMiddleware, getAllUsers);
router.patch('/users/:userId', adminMiddleware, updateUser);

// ✅ Registration key route (admin only)
router.post('/users/registration-key', adminMiddleware , createOrUpdateKey);
router.get('/users/registration-key', adminMiddleware, getKeyInfo);

module.exports = router;
