
/* === controllers/productController.js === */
const Product = require('../models/ShopItem');

const createProduct = async (req, res) => {
  try {
    const data = req.body;
    if (req.file) {
      data.mediaUrl = `/uploads/${req.file.filename}`;
      data.mediaType = 'image';
    }
    const product = new Product(data);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllProducts = async (req, res) => {
  const filter = req.query.category ? { category: req.query.category } : {};
  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// Get single product
const  getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const toggleActive = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.isActive = !product.isActive;
    await product.save();
    res.json({ status: product.isActive ? 'enabled' : 'disabled' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {createProduct, getAllProducts, updateProduct, deleteProduct, toggleActive, getProductById}