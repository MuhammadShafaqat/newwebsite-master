const multer = require('multer');
const path = require('path');
const fs = require('fs');

const productPath = 'uploads/products';
if (!fs.existsSync(productPath)) {
  fs.mkdirSync(productPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

module.exports = multer({ storage });
