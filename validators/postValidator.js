const { body } = require('express-validator');

const validatePost = [
    body('title').isLength({ min: 5 }),
    body('content').isLength({ min: 10 })
];

const validateReply = [
    body('text').isLength({ min: 3 })
];

module.exports = { validatePost, validateReply };