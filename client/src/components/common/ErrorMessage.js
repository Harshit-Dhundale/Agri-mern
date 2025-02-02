import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({ message }) => {
  return message ? (
    <div className="error-message">
      ⚠️ {message}
    </div>
  ) : null;
};

export default ErrorMessage;