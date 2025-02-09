// Email validation
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

// Password validation
export const validatePassword = (password) => {
  const minLength = 8;
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  return password.length >= minLength && hasNumber && hasSpecialChar;
};

// Registration validation
export const validateRegistration = (formData) => {
  const errors = {};

  if (!formData.username.trim()) {
    errors.username = "Username is required";
  } else if (formData.username.length < 3) {
    errors.username = "Username must be at least 3 characters";
  }

  if (!validateEmail(formData.email)) {
    errors.email = "Invalid email address";
  }

  if (!validatePassword(formData.password)) {
    errors.password = "Password must be at least 8 characters with a number and special character";
  }

  return errors;
};

// Crop input validation
export const validateCropInputs = (values) => {
  const errors = {};
  const numberFields = [
    'nitrogen', 'phosphorous', 'potassium',
    'temperature', 'humidity', 'ph', 'rainfall'
  ];

  numberFields.forEach(field => {
    const value = parseFloat(values[field]);
    if (isNaN(value) || value === '') {
      errors[field] = 'This field is required';
    } else if (value < 0) {
      errors[field] = 'Value cannot be negative';
    }
  });

  return errors;
};

// Fertilizer input validation
export const validateFertilizerInputs = (values) => {
  const errors = {};
  const requiredFields = [
    'temperature', 'humidity', 'moisture',
    'nitrogen', 'phosphorus', 'potassium', 'soil', 'crop'
  ];

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'This field is required';
    }
  });

  return errors;
};

// Disease input validation
export const validateDiseaseInputs = (values) => {
  const errors = {};

  if (!values.crop) {
    errors.crop = 'Crop type is required';
  }

  if (!values.file) {
    errors.file = 'Image file is required';
  } else if (!values.file.type.startsWith('image/')) {
    errors.file = 'File must be an image';
  }

  return errors;
};

// Comment validation
export const validateComment = (text) => {
  if (!text.trim()) {
    return 'Comment cannot be empty';
  }
  if (text.length > 500) {
    return 'Comment cannot exceed 500 characters';
  }
  return '';
};