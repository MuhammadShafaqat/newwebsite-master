const express = require('express');
const router = express.Router();
const {createProduct, getAllProducts, updateProduct, deleteProduct, toggleActive, getProductById} = require('../controllers/shopController');
const upload = require('../middlewares/upload');

router.get('/',  getAllProducts);
router.get('/:id',  getProductById);
router.post('/',  upload.single('image'), createProduct);
router.put('/:id',  upload.single('image'), updateProduct);
router.delete('/:id',  deleteProduct);
router.patch('/:id/toggle', toggleActive);

module.exports = router;
