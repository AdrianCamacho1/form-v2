// src/App.js
import React from 'react';
import './App.css';
import ContactUsForm from './components/ContactUsForm';
import './components/ContactUsForm.css'; // Import the CSS for styling

function App() {
  return (
    <div className="App">
      <h1>Contact Us Form</h1>
      <ContactUsForm />
    </div>
  );
}

export default App;
