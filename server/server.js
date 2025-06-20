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

const app = express();
connectDB(); // ✅ Connect to MongoDB

// Middlewares
app.use(express.json());
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(morgan('dev'));
app.use(cookieParser());

// Rate limiter
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRoutes);



// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
