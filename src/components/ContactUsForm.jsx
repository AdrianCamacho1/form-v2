// src/components/ContactUsForm.jsx
import React, { useState } from 'react';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: '',
  });
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation: Ensure all fields are filled
    if (!formData.name || !formData.email || !formData.description) {
      setError('All fields are required.');
      return;
    }

    setError(''); // Clear previous errors
    setStatus('Submitting...');
    
    const apiUrl = 'https://vr0ffp01el.execute-api.us-east-2.amazonaws.com/dev'; // Replace with your API Gateway endpoint

    try {
      // Send the form data to the API Gateway
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', description: '' });
      } else {
        throw new Error('Message submission failed.');
      }
    } catch (error) {
      setStatus('');
      setError('Error submitting the form. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="contact-us-form">
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            placeholder="Your Name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="Your Email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            placeholder="Your message here..."
          />
        </div>

        <div className="form-actions">
          <button type="submit">Submit</button>
        </div>

        {error && <p className="error">{error}</p>}
        {status && <p className="status">{status}</p>}
      </form>
    </div>
  );
};

export default ContactUsForm;
