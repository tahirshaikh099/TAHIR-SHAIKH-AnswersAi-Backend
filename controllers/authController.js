const jwt = require('jsonwebtoken');
const User = require('../models/User');

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


exports.logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
        await req.user.save();

        res.status(200).json({ status: 'success', data: "User logged out" });
    } catch (e) {
        res.status(500).json({ status: "error", error: e.message });
    }
};

exports.refreshToken = (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ status: "success", token: newToken });
    } catch (e) {
        res.status(500).json({ status: "error", error: e.message });
    }
};
