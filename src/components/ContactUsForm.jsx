import React, { useState } from 'react';

const ContactUsForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });
  
  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSuccess: false,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ isSubmitting: true, isSuccess: false, error: null });
    
    try {
      console.log('Sending data to API:', formData);
      
      const response = await fetch('https://vr0ffp01el.execute-api.us-east-2.amazonaws.com/dev/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      const responseData = await response.json();
      console.log('Response from API:', responseData);
      
      // Check the statusCode in the response
      if (responseData.statusCode === 200) {
        console.log('Form submitted successfully');
        setFormStatus({ isSubmitting: false, isSuccess: true, error: null });
        
        // Reset the form on success
        setFormData({ name: '', email: '', description: '' });
      } else {
        const errorMessage = responseData.body 
          ? JSON.parse(responseData.body).message 
          : 'Unknown error occurred';
          
        console.error('API returned error:', errorMessage);
        setFormStatus({ isSubmitting: false, isSuccess: false, error: errorMessage });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ 
        isSubmitting: false, 
        isSuccess: false, 
        error: 'Network error. Please try again.' 
      });
    }
  };

  return (
    <div className="contact-form">
      <h2>Contact Us</h2>
      
      {formStatus.isSuccess && (
        <div className="success-message">
          Thank you! Your message has been sent successfully.
        </div>
      )}
      
      {formStatus.error && (
        <div className="error-message">
          Error: {formStatus.error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Message</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="5"
          />
        </div>
        
        <button 
          type="submit"
          disabled={formStatus.isSubmitting}
          className="submit-button"
        >
          {formStatus.isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
};

export default ContactUsForm;