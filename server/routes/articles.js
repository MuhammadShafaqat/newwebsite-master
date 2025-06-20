const express = require('express');
const router = express.Router();
const { createArticle, getArticles, deleteArticle, getArticleById } = require('../controllers/articleController');
const {authMiddleware} = require('../middlewares/authMiddleware');

router.post('/' ,createArticle);
router.get('/', getArticles);
router.get('/:id' ,getArticleById);
router.delete('/:id' ,deleteArticle);
 

module.exports = router;