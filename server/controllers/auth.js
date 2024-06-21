import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import users from '../models/auth.js';
export const signup =async(req,res) => {
    const {name,email,password}=req.body;
    try{

        const existingUser =await users.findOne({email});
        if(existingUser){
            return res.status(404).json({message:"User already Exist."})
        }
        const hashedPassword=await bcrypt.hash(password,12)
        const newUser=await users.create({name,email,password:hashedPassword })
        const token =jwt.sign({email:newUser.email ,id:newUser._id}  ,process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(200).json({result:newUser, token});

    }catch(error){
         res.status(500).json("Something went wrong..");

    }
}
export const login =async(req,res) => {
    const {email , password} =req.body;  
    try{
        const existingUser =await users.findOne({email});
        if(!existingUser){
            return res.status(404).json({message:"User don't exist"})
        }
        const isPasswordCrt= await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid Credentials"})
        }
        const token =jwt.sign({email:existingUser.email ,id:existingUser._id} ,process.env.JWT_SECRET, {expiresIn:'1h'});
        res.status(200).json({result:existingUser, token})

    }catch(errror){
        res.status(500).json("Something went wrong..");
    }

}
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: '1h' });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `http://yourdomain.com/reset-password/${resetToken}`;
    // Send email logic goes here

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const resendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_RESET_PASSWORD_SECRET, { expiresIn: '1h' });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetUrl = `http://yourdomain.com/reset-password/${resetToken}`;
    // Send email logic goes here

    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_RESET_PASSWORD_SECRET);

    const user = await User.findOne({ _id: decoded._id, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};