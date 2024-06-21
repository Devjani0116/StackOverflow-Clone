import express from 'express';
import { forgotPassword, login, resetPassword, signup } from '../controllers/auth.js';
import { getAllUsers, updateProfile } from '../controllers/users.js';
import auth from '../middleware/auth.js';
 const router =express.Router();
router.post('/signup',signup);
router.post('/login',login);
router.post('/forgot-password', forgotPassword);

// Route for resetting password
router.post('/reset-password/:token', resetPassword);


router.get('/getAllUsers',getAllUsers)
router.patch('/update/:id',auth,updateProfile)
export default router;