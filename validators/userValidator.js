const { body } = require('express-validator');

const validateUserRegistration = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  
  body('fullName')
    .trim()
    .notEmpty().withMessage('Full name is required'),
  
  body('email')
    .trim()
    .isEmail().withMessage('Invalid email address'),
  
  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  
  body('gender')
    .notEmpty().withMessage('Gender is required')
    .isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender value'),
  
  body('phone')
    .notEmpty().withMessage('Phone number is required')
    .isMobilePhone().withMessage('Invalid phone number'),
  
  body('country')
    .notEmpty().withMessage('Country is required'),
  
  body('state')
    .notEmpty().withMessage('State is required'),
  
  body('city')
    .notEmpty().withMessage('City is required'),
  
  body('pincode')
    .notEmpty().withMessage('Pincode is required')
    .isPostalCode('any').withMessage('Invalid pincode'),
  
  body('dob')
    .notEmpty().withMessage('Date of birth is required')
    .isISO8601().withMessage('Date of birth must be a valid date')
];

const validateUserLogin = [
  body('identifier')
    .trim()
    .notEmpty().withMessage('Email or Username is required'),
  body('password')
    .notEmpty().withMessage('Password is required')
];

module.exports = { validateUserRegistration, validateUserLogin };