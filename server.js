const express = require('express');
const cors = require('cors');
const path = require('path');

const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');
const authRoutes = require('./routes/authRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend static assets (public directory)
app.use(express.static(path.join(__dirname, 'public')));

// Core API Gateways
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/auth', authRoutes);

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        service: 'QuickBite Core Gateway'
    });
});

// Single Page Application Fallback (Fixed for Express v5 / path-to-regexp)
app.use((req, res, next) => {
    // Agar API route nahi mila toh error handler ko bhej do
    if (req.path.startsWith('/api')) {
        return next();
    }
    // Baaki sabhi frontend routes ke liye index.html serve karo
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Centralized Error Handling Barrier
app.use(errorHandler);

// Listen on 0.0.0.0 to accept external tunnel & local network traffic
app.listen(PORT, '0.0.0.0', () => {
    console.log(`====================================================`);
    console.log(` QuickBite Core API Gateway Active`);
    console.log(` Local:   http://localhost:${PORT}`);
    console.log(` Network: http://0.0.0.0:${PORT}`);
    console.log(`====================================================`);
});