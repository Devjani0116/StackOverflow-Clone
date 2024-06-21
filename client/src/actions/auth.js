import * as api from '../api';
import { setCurrentUser } from './currentUser';

export const signup = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.signUp(authData);
    dispatch({ type: 'AUTH', data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    navigate('/');
  } catch (error) {
    console.log( error);
  }
};

export const login = (authData, navigate) => async (dispatch) => {
  try {
    const { data } = await api.logIn(authData);
    dispatch({ type: "AUTH", data });
    dispatch(setCurrentUser(JSON.parse(localStorage.getItem("Profile"))));
    navigate("/");
  } catch (error) {
    console.log(error);
  }
};
export const forgotPassword = (email) => async (dispatch) => {
  try {
    await api.forgotPassword(email);
    alert('Reset link sent to your email');
  } catch (error) {
    console.log(error);
    alert('Error sending reset link');
  }
};

export const resendResetPasswordEmail = (email) => async (dispatch) => {
  try {
    await api.resendResetPasswordEmail(email);
    alert('Reset link resent to your email');
  } catch (error) {
    console.log(error);
    alert('Error resending reset link');
  }
};

export const resetPassword = (token, newPassword, navigate) => async (dispatch) => {
  try {
    await api.resetPassword(token, newPassword);
    alert('Password reset successful');
    navigate('/login');
  } catch (error) {
    console.log(error);
    alert('Error resetting password');
  }
};