const { body } = require('express-validator');

const validateDisease = [
    body('crop').notEmpty().withMessage('Crop is required'),
    // body('imageUrl').isURL().withMessage('Invalid image URL')
];

module.exports = validateDisease;