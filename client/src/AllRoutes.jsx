import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AskQuestion from './Pages/AskQuestion/AskQuestion';
import Auth from './Pages/Auth/Auth';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import ResetPassword from './Pages/Auth/ResetPassword';
import Home from './Pages/Home/Home';
import DisplayQuestion from './Pages/Questions/DisplayQuestion';
import Questions from './Pages/Questions/Questions';
import Tags from './Pages/Tags/Tags';
import UserProfile from './Pages/UserProfile/UserProfile';
import Users from './Pages/Users/Users';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/questions" element={<Questions />} />
      <Route path="/ask-question" element={<AskQuestion />} />
      <Route path="/questions/:id" element={<DisplayQuestion />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<UserProfile />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  );
}

export default AllRoutes;
