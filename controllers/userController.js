const User = require('../models/User');

/**
 * @function createUser
 * @description Creates a new user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createUser = async (req, res) => {
    const { username, email, password } = req.body;

    if (!email) {
        return res.status(401).json({ status: 'error', error: 'Email is required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ status: 'error', error: 'Email already exists' });
        }
        const user = new User({ username, email, password });
        await user.save();

        return res.status(201).json({ status: 'success', data: user });

    } catch (e) {
        return res.status(500).json({ status: "error", error: e.message });
    }
};

/**
 * @function getUser
 * @description Retrieves a specific user by their ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        return res.status(200).json({ status: "success", data: user });
    } catch (e) {
        return res.status(500).json({ status: "error", error: e.message });
    }
};

/**
 * @function getUserQuestions
 * @description Retrieves all questions asked by a specific user.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getUserQuestions = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).populate('questions');
        if (!user) {
            return res.status(404).json({ status: 'error', error: 'User not found' });
        }

        return res.status(200).json({ status: 'success', data: user.questions });

    } catch (e) {
        return res.status(500).json({ status: "error", error: e.message });
    }
};