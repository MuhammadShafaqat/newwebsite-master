const express = require('express');
const router = express.Router();
const { createArticle, getArticles, deleteArticle, updateArticle, getArticleById } = require('../controllers/articleController');
const {authMiddleware} = require('../middlewares/authMiddleware');
const uploadArticle = require('../middlewares/uploadArticle')

router.post('/', uploadArticle.single('image') ,createArticle);
router.put('/:id', uploadArticle.single('image'), updateArticle);
router.get('/', getArticles);
router.get('/:id' ,getArticleById);
router.delete('/:id' ,deleteArticle);
 

module.exports = router;