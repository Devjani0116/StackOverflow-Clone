import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../../actions/auth';
import './Auth.css';

const ResetPassword = ({ token }) => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      alert('Please enter your new password');
      return;
    }
    dispatch(resetPassword({ token, password }));
  };

  return (
    <section className='auth-section'>
      <div className='auth-container-2'>
        <h2>Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">
            <h4>New Password</h4>
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} />
          </label>
          <button type='Submit' className='auth-btn'>Reset Password</button>
        </form>
      </div>
    </section>
  );
};

export default ResetPassword;
