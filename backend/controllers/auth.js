const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE || '7d',
    });
};

// @desc    Register a new user
// @route   POST /api/v1/register
// @access  Public
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'An account with this email already exists' });
        }

        // Create user
        const user = await User.create({ name, email, password });

        // Generate token and respond
        const token = generateToken(user._id);

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Register error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Login user
// @route   POST /api/v1/login
// @access  Public
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Find user and include password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate token and respond
        const token = generateToken(user._id);

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
};

// @desc    Get current logged-in user
// @route   GET /api/v1/me
// @access  Private
exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};
