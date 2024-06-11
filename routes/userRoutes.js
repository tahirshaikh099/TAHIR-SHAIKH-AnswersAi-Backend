const express = require('express');
const { createUser, getUser, getUserQuestions } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', createUser);
router.get('/:userId', authMiddleware, getUser);
router.get('/:userId/questions', authMiddleware, getUserQuestions);

module.exports = router;
