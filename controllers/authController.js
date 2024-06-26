const jwt = require('jsonwebtoken');
const User = require('../models/User');


/**
 * @function login
 * @description Logs in a user and generates a JWT token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(403).json({ status: 'error', error: 'Email and password are required' });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ status: 'error', error: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.status(200).json({ status: 'success', data: { token: token, userId: user._id } });
    } catch (e) {
        res.status(500).json({ status: "error", error: e.message });
    }
};


/**
 * @function logout
 * @description Logs out a user by invalidating their JWT token.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.logout = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        req.user.tokens = req.user.tokens.filter(t => t.token !== token);
        await req.user.save();
        res.status(200).json({ status: 'success', data: "User logged out" });
    } catch (e) {
        console.log(e);
        res.status(500).json({ status: "error", error: e.message });
    }
};

/**
 * @function refreshToken
 * @description Refreshes a JWT token for a user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.refreshToken = (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: true });
        const newToken = jwt.sign({ userId: decoded.userId }, process.env.JWT_SECRET, { expiresIn: '24h' });
        res.status(201).json({ status: "success", token: newToken });
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ status: 'error', error: 'Invalid token' });
        }
        res.status(500).json({ status: "error", error: e.message });
    }
};
