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
router.get('/user', authMiddleware ,getUser);
router.get('/users', authMiddleware, getAllUsers);
router.patch('/users/:userId', authMiddleware, updateUser);

// ✅ Registration key route (admin only)
router.post('/users/registration-key', createOrUpdateKey);
router.get('/users/registration-key', getKeyInfo);

module.exports = router;
