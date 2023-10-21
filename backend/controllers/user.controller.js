import mongoose from "mongoose";
import User from "../models/usersModel";

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        return res.status(200).json(users);
    } catch (error) {
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body)
        return res.status(201).json(user);
    } catch (error) {
        if(error instanceof mongoose.Error){
            return res.status(400).json({msg:error.message})
        }
        if(error.code === 11000){
            return res.status(400).json({msg:"Duplicate Email Error"})
        }
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.query.user_id)
        if(!user){
            return res.status(404).json({msg:"User Not Found"})
        }
        return res.status(200).json(user);
    } catch (error) {
        if(error instanceof mongoose.Error){
            return res.status(400).json({msg:error.message})
        }
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.query.user_id, req.body, {
            new:true,
            runValidators:true
        })
        if(!user){
            return res.status(404).json({msg:"User Not Found"})
        }
        return res.status(200).json(user);
    } catch (error) {
        if(error instanceof mongoose.Error){
            return res.status(400).json({msg:error.message})
        }
        if(error.code === 11000){
            return res.status(400).json({msg:"Duplicate Email Error"})
        }
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.query.user_id)
        if(!user){
            return res.status(404).json({msg:"User Not Found"})
        }
        return res.status(200).json({msg:"User Deleted"});
    } catch (error) {
        if(error instanceof mongoose.Error){
            return res.status(400).json({msg:error.message})
        }
        console.log(error);
        return res.status(500).json({msg:"Internal Server Error"})
    }
}