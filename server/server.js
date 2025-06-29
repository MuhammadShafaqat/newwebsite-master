// server.js
require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const articleRoutes = require('./routes/articles');
const shopRoutes = require("./routes/shop");
const orderRoutes = require('./routes/order');
const bannerRoutes = require('./routes/infobanner');
const eventRoutes = require('./routes/events');
const videoRoutes = require('./routes/videos');
const path = require('path'); // ✅ Required for static file path resolution

const app = express();
connectDB(); // ✅ Connect to MongoDB

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: 'http://localhost:4200',  credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// ✅ Static Files for Uploaded Images
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Cross-Origin-Resource-Policy', 'cross-origin'); // ✅ Required by Chrome
  next();
}, express.static(path.join(__dirname, 'uploads')));


// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/products', shopRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/banner', bannerRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/videos', videoRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
