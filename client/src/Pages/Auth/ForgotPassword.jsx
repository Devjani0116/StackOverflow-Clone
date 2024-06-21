// components/Auth/ForgotPassword.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { forgotPassword, resendResetPasswordEmail } from '../../actions/auth';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleForgotPassword = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  const handleResendEmail = (e) => {
    e.preventDefault();
    dispatch(resendResetPasswordEmail(email));
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <label htmlFor="email">
          <h4>Email</h4>
          <input type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" className="auth-btn">Send Reset Link</button>
      </form>
      <button onClick={handleResendEmail} className="auth-btn">Resend Reset Link</button>
    </div>
  );
};

export default ForgotPassword;
