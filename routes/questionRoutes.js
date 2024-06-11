const express = require('express');
const { createQuestion, getQuestion } = require('../controllers/questionController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createQuestion);
router.get('/:questionId', authMiddleware, getQuestion);

module.exports = router;
