const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization') ? req.header('Authorization').replace('Bearer ', '') : null;
    if (!token) {
        return res.status(403).json({ status: 'error', error: 'Access denied' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, { ignoreExpiration: false });
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(498).json({ status: 'error', error: 'Invalid token' });
        }

        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        if (e.name === 'TokenExpiredError') {
            return res.status(401).json({ status: 'error', error: 'Invalid token' });
        }
        res.status(500).json({ status: "error", error: e.message });
    }
};
