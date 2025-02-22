import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.status === 201) {
        setFeedback('Thank you for reaching out! We will get back to you soon.');
        setForm({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setFeedback(data.message || 'Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      setFeedback('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      <header className="contact-header">
        <div className="header-overlay">
          <h1>Contact Us</h1>
          <p>We’d love to hear from you! Whether you have a question, suggestion, or partnership inquiry, please fill out the form below.</p>
        </div>
      </header>
      <main className="contact-content">
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                value={form.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={form.email} 
                onChange={handleChange} 
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input 
              type="text" 
              id="subject" 
              name="subject" 
              value={form.subject} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={form.message} 
              onChange={handleChange} 
              required 
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
          {feedback && <p className="feedback">{feedback}</p>}
        </form>
        <div className="contact-info">
          <h2>Our Contact Info</h2>
          <p><strong>Email:</strong> support@farmiculture.com</p>
          <p><strong>Phone:</strong> +1 (555) 123-4567</p>
          <p>
            <strong>Address:</strong> 123 FarmiCulture Lane, Agricultural City, Country
          </p>
        </div>
      </main>
      <footer className="contact-footer">
        <p>&copy; 2025 FarmiCulture. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;