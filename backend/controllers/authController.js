import { userModel } from "../models/UserModel.js";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import generateVerificationCode from "../utils/generateCode.js";
import generateTokenAndCookie from "../utils/generateTokenAndCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendResetPasswordEmail, sendResetPasswordSuccessMail } from "../mailtrap/emails.js";

export const signup=async (req, res)=> {
    try{
        const {name, email, password}=req.body;

        if(!email || !password || !name){
            throw new Error("All fields are required!!");
        }

        const userAlreadyExist=await userModel.findOne({email}).select("-password");
        if(userAlreadyExist){
            return res.status(400).json({
                message: "User already exists",
                success: false
            });
        }

        const hashPassword=await bcryptjs.hash(password, 10);
        const verificationCode=generateVerificationCode();

        const payload={
            name: name,
            email: email,
            password: hashPassword,
            verificationToken: verificationCode,
            verificationTokenExpiresAt: Date.now()+24*60*60*1000
        }

        const newUser=new userModel(payload);
        const savedUser=await newUser.save();

        const token=generateTokenAndCookie(res, newUser?._id);

        await sendVerificationEmail(newUser?.email, verificationCode);

        return res.status(201).json({
            message: "User signup successful",
            data: {
                ...savedUser._doc,
                password: undefined
            },
            token: token,
            success: true
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true
        });
    }
}

export const verifyEmail=async (req, res)=> {
    try{
        const {code}=req.body;

        const user=await userModel.findOne({verificationToken: code});
        if(!user){
            return res.status(400).json({
                message: "Invalid or expired verification code",
                success: false
            });
        }

        user.isVerified=true;
        user.verificationToken=undefined;
        user.verificationTokenExpiresAt=undefined;
        await user.save();

        await sendWelcomeEmail(user?.email, user?.name);

        return res.status(200).json({
            message: "Welcome email sent successfully",
            success: true,
            data: {
                ...user._doc,
                password: undefined
            }
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const login=async (req, res)=> {
    try{
        const {email, password}=req.body;

        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const isPassword=await bcryptjs.compare(password, user?.password);
        if(!isPassword){
            return res.status(400).json({
                message: "Invalid password",
                success: false
            });
        }

        generateTokenAndCookie(res, user?._id);

        user.lastLogin=new Date();
        await user.save();

        return res.status(200).json({
            message: "User logged in successfully",
            success: true,
            data: {
                ...user._doc,
                password: undefined
            }
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const forgotPassword=async (req, res)=> {
    try{
        const {email}=req.body;

        const user=await userModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        const resetToken=crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt=Date.now()+1*60*60*1000;

        user.resetPasswordToken=resetToken;
        user.resetPasswordExpiresAt=resetTokenExpiresAt;

        await user.save();

        await sendResetPasswordEmail(user?.email, `${process.env.FRONTEND_URL}/reset-password/${resetToken}`);

        return res.status(200).json({
            message: "Password reset link sent successfully",
            success: true,
            data: {
                ...user._doc,
                password: undefined
            }
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const resetPassword=async (req, res)=> {
    try{
        const {newPassword}=req.body;
        const {token}=req.params;

        const user=await userModel.findOne({
            resetPasswordToken: token,
            resetPasswordExpiresAt: {$gt: Date.now()}
        });
        if(!user){
            return res.status(400).json({
                message: "Invalid or expired token",
                success: true
            });
        }

        const hashNewPassword=await bcryptjs.hash(newPassword, 10);
        user.password=hashNewPassword;
        user.resetPasswordToken=undefined;
        user.resetPasswordExpiresAt=undefined;
        await user.save();

        await sendResetPasswordSuccessMail(user?.email);

        return res.status(200).json({
            message: "Password reset successful",
            success: true
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}

export const logout=async (req, res)=> {
    res.clearCookie("token");
    return res.status(200).json({
        message: "User logged out successfully",
        success: true
    });
}

export const checkAuth=async (req, res)=> {
    try{
        const user=await userModel.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({
                message: "User not found",
                success: false
            });
        }

        return res.status(200).json({
            data: user,
            success: true
        });
    }catch(error){
        return res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
}