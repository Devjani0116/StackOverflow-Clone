// components/Auth/ResetPassword.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';
import './Auth.css';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword(token, newPassword, navigate));
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleResetPassword}>
        <label htmlFor="newPassword">
          <h4>New Password</h4>
          <input type="password" name="newPassword" id="newPassword" onChange={(e) => setNewPassword(e.target.value)} />
        </label>
        <button type="submit" className="auth-btn">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
