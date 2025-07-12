const Article = require('../models/Article');

const createArticle = async (req, res) => {
  try {
    const { title, body, author} = req.body;

   
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'At least one image is required' });
    }

const imageUrls = req.files.map(file => `/uploads/articles/${file.filename}`);
    const article = new Article({ title, body, imageUrls });
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
    const { title, body, author } = req.body;

    // Find the article by ID
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Start with existing values
    const updatedData = {
      title: title || article.title,
      body: body || article.body,
      author: author || article.author,
      imageUrls: article.imageUrls
    };

    // If new images are uploaded, replace existing imageUrls
    if (req.files && req.files.length > 0) {
      updatedData.imageUrls = req.files.map(file => `/uploads/articles/${file.filename}`);
    }

    // Update the article
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: 'Article updated successfully',
      article: updatedArticle
    });
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
