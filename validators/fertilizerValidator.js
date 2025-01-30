const { body } = require('express-validator');

const validateFertilizer = [
    body('soilTemperature').isNumeric(),
    body('soilHumidity').isNumeric(),
    body('soilMoisture').isNumeric(),
    body('nitrogen').isNumeric(),
    body('phosphorous').isNumeric(),
    body('potassium').isNumeric(),
    body('soilType').notEmpty(),
    body('cropType').notEmpty()
];

module.exports = validateFertilizer;