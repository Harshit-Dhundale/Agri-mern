const { body } = require('express-validator');

const validateCrop = [
    body('nitrogen').isNumeric().withMessage('Nitrogen must be a number'),
    body('phosphorus').isNumeric().withMessage('Phosphorus must be a number'), // Correct field name
    body('potassium').isNumeric().withMessage('Potassium must be a number'),
    body('soilTemperature').isNumeric().withMessage('Soil temperature must be a number'),
    body('soilHumidity').isNumeric().withMessage('Soil humidity must be a number'),
    body('soilPh').isNumeric().withMessage('Soil pH must be a number'),
    body('rainfall').isNumeric().withMessage('Rainfall must be a number')
];

module.exports = validateCrop;