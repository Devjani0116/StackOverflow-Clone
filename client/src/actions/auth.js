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
export const forgotPassword = (formData) => async (dispatch) => {
  try {
    const { data } = await api.forgotPassword(formData);
    alert('Reset link sent to your email');
    // Optionally, redirect to a success page or display a success message
  } catch (error) {
    console.error(error);
    alert('Error sending reset link');
  }
};

export const resetPassword = ({ token, password }) => async (dispatch) => {
  try {
    const { data } = await api.resetPassword({ token, password });
    alert('Password reset successful');
    // Optionally, redirect to login page or any other appropriate page
  } catch (error) {
    console.log(error);
    alert('Error resetting password');
  }
};