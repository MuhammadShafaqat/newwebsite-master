const Article = require('../models/Article');

const createArticle = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const imageUrl = `/uploads/articles/${req.file.filename}`;
    const article = new Article({ title, body, imageUrl });
    await article.save();

    res.status(201).json({ message: 'Article created successfully', article });
  } catch (err) {
    console.error('Create Article Error:', err);
    res.status(500).json({ message: 'Failed to create article' });
  }
};


const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch article' });
  }
};


 const  getArticles  = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
};

const updateArticle = async (req, res) => {
  try {
    const { title, body } = req.body;
    const updatedData = { title, body };

    // If new image is uploaded
    if (req.file) {
      updatedData.imageUrl = `/uploads/articles/${req.file.filename}`;
    }

    const updatedArticle = await Article.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!updatedArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }

    res.status(200).json({ message: 'Article updated successfully', article: updatedArticle });
  } catch (err) {
    console.error('Update Article Error:', err);
    res.status(500).json({ message: 'Failed to update article' });
  }
};


const deleteArticle = async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Article deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete article' });
  }
};



module.exports = {createArticle, getArticleById, getArticles, updateArticle, deleteArticle }
