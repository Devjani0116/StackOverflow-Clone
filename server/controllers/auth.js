import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import nodemailer from 'nodemailer';
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
      const user = await users.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User doesn't exist" });
      }
      const token = crypto.randomBytes(32).toString('hex');
      const hashedToken = await bcrypt.hash(token, 12);
  
      user.resetToken = hashedToken;
      user.tokenExpiration = Date.now() + 3600000; // Token valid for 1 hour
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: user.email,
        subject: 'Password Reset',
        text: `You requested for a password reset. Click on this link to reset your password: 
        http://localhost:3000/reset-password/${token}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Reset link sent to your email' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  
  // Endpoint to reset password
  export const resetPassword = async (req, res) => {
    const { token, password } = req.body;
    try {
      const user = await users.findOne({ resetToken: { $ne: null }, tokenExpiration: { $gt: Date.now() } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      const isTokenValid = await bcrypt.compare(token, user.resetToken);
      if (!isTokenValid) {
        return res.status(400).json({ message: 'Invalid or expired token' });
      }
      user.password = await bcrypt.hash(password, 12);
      user.resetToken = null;
      user.tokenExpiration = null;
      await user.save();
      res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };