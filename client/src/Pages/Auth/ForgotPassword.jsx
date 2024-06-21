import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendResetLink } from '../../actions/auth';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      alert('Please enter your email');
      return;
    }
    dispatch(sendResetLink({ email }));
  };

  return (
    <section className='auth-section'>
      <div className='auth-container-2'>
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">
            <h4>Email</h4>
            <input type="email" name='email' id='email' onChange={(e) => { setEmail(e.target.value) }} />
          </label>
          <button type='Submit' className='auth-btn'>Send Reset Link</button>
        </form>
      </div>
    </section>
  );
};

export default ForgotPassword;
