// ForgotPassword.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword } from '../../actions/auth';
import './Auth.css';

const ForgotPassword = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(emailOrPhone));
  };

  return (
    <div className='auth-container'>
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailOrPhone">Enter your email or phone number:</label>
        <input
          type="text"
          id="emailOrPhone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
          required
        />
        <button type="submit" className='auth-btn'>Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
