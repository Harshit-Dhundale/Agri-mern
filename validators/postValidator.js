const { body } = require('express-validator');

const validatePost = [
  body('title')
    .trim()
    .isLength({ min: 5 })
    .withMessage('Title must be at least 5 characters long'),
  
  body('content')
    .trim()
    .isLength({ min: 10 })
    .withMessage('Content must be at least 10 characters long')
];

const validateReply = [
  body('text')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Reply must be at least 3 characters long')
];

module.exports = { validatePost, validateReply };
