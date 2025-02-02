import React, { useState } from 'react';
import PropTypes from 'prop-types';
import LoadingSpinner from './LoadingSpinner';
import './CommentForm.css'; // Create this CSS file

const CommentForm = ({ onSubmit, isSubmitting }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Comment cannot be empty');
      return;
    }
    setError('');
    onSubmit(text);
    setText('');
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a reply..."
          rows={4}
          disabled={isSubmitting}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <LoadingSpinner /> : 'Post Reply'}
        </button>
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

CommentForm.defaultProps = {
  isSubmitting: false,
};

export default CommentForm;