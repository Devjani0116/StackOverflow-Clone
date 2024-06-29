import { toast } from 'react-toastify';
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
}

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

export const forgotPassword = (emailOrPhone) => async (dispatch) => {
  try {
    await api.forgotPassword(emailOrPhone);
    toast.success('Password reset link sent to your email or phone.');
  } catch (error) {
    console.log(error);
    toast.error('Failed to send password reset link. Please try again.');
  }
};

export const resetPassword = (token, newPassword, navigate) => async (dispatch) => {
  try {
    await api.resetPassword(token, newPassword);
    navigate('/auth');
    toast.success('Password reset successful. Please log in with your new password.');
  } catch (error) {
    console.log(error);
    toast.error('Failed to reset password. Please try again.');
  }
};