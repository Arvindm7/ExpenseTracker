require('dotenv').config()

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { db } = require('./db/db');
const { readdirSync } = require('fs');

const PORT = process.env.PORT || 5000;

const app = express();

// Security: HTTP headers hardening
app.use(helmet());

// Logging: Request logger for development/debugging
app.use(morgan('dev'));

// Rate Limiting: Prevent abuse (100 requests per 15 min per IP)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please try again later.' }
});
app.use('/api/', apiLimiter);

// Body parser
app.use(express.json());

// CORS: Restrict to known origins in production
const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',')
    : ['http://localhost:3000'];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, curl, etc.)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Health check endpoint
app.get('/', (req, res) => {
    res.json({
        status: 'OK',
        message: 'ExpenseTracker API is running',
        version: '1.0.0'
    });
});

// Routes — auto-load all route files from /routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// 404 handler — must come after all routes
app.use((req, res) => {
    res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handler — catches unhandled errors in route handlers
app.use((err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    console.error(err.stack);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`🚀 Server is listening on port: ${PORT}`);
    });
};

server();