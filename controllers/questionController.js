const Question = require('../models/Question');
const User = require('../models/User');
const { getAnswer } = require('../config/ai');

/**
 * @function createQuestion
 * @description Creates a new question and fetches the answer from an AI service.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.createQuestion = async (req, res) => {
  const { questionText } = req.body;
  const userId = req.user._id;
  try {
    const answerText = await getAnswer(questionText);
    const question = new Question({ question: questionText, answer: answerText, user: userId });
    await question.save();
    const user = await User.findById(req.user._id);
    user.questions.push(question);
    await user.save();

    return res.status(201).json({ status: 'success', data: question });
  } catch (e) {
    return res.status(500).json({ status: 'error', error: e.message });
  }
};

/**
 * @function createQuestion
 * @description Creates a new question and fetches the answer from an AI service.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
exports.getQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.questionId);
    if (!question) {
      return res.status(404).json({ status: 'error', error: 'Question not found' });
    }

    return res.status(200).json({ status: 'success', data: question });
  } catch (e) {
    return res.status(500).json({ status: "error", error: e.message });
  }
};
