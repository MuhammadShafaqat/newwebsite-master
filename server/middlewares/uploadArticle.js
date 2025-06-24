const multer = require('multer');
const path = require('path');
const fs = require('fs');

const articlePath = 'uploads/articles';
if (!fs.existsSync(articlePath)) {
  fs.mkdirSync(articlePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, articlePath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

module.exports = multer({ storage });
