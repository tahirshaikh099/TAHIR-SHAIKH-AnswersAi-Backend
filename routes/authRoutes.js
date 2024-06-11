const express = require('express');
const { login, logout, refreshToken } = require('../controllers/authController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/refresh', authMiddleware, refreshToken);

module.exports = router;