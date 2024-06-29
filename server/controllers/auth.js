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
      const user = await users.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User doesn't exist" });
      }

      const resetToken = crypto.randomBytes(20).toString('hex');
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      const transporter = nodemailer.createTransport({
          service: 'Gmail',
          auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
          }
      });

      const mailOptions = {
          to: user.email,
          from: process.env.EMAIL_USER,
          subject: 'Password Reset',
          text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
                 Please click on the following link, or paste this into your browser to complete the process:\n\n
                 https://stackoverflow-productions.netlify.app/reset-password/${resetToken}\n\n
                 If you did not request this, please ignore this email and your password will remain unchanged.\n`
      };

      transporter.sendMail(mailOptions, (err, response) => {
          if (err) {
              console.error('There was an error: ', err);
              return res.status(500).json("Something went wrong.");
          } else {
              res.status(200).json('Recovery email sent.');
          }
      });
  } catch (error) {
      res.status(500).json("Something went wrong.");
  }
}

export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
      const user = await users.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } });
      if (!user) {
          return res.status(400).json({ message: "Password reset token is invalid or has expired." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;

      await user.save();

      res.status(200).json('Password has been reset.');
  } catch (error) {
      res.status(500).json("Something went wrong.");
  }
}