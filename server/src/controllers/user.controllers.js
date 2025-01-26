import { user } from "../models/user.models.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import zod from "zod";


const userSchema = zod.object({
    username: zod.string().nonempty("Username is required"),
    email: zod.string().email("Invalid email address"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
    fullname: zod.string().nonempty("Full name is required"),
  });

const userSignup = async (req, res) => {
    const {username,email,password,fullname} = req.body;

    const validateUser = userSchema.safeParse(req.body);
    if(!validateUser.success){
        return res.status(400).json({
            message:"Validation failed",
            errors:validateUser.error.errors});
    }


    const existedUser = await user.findOne({
        $or : [{username},{email}]
    })

    if(existedUser){
        return res.status(409).json({message:"User already exists"});
    }

    try {
        const Newuser = await user.create({
            username,
            fullname,
            email,
            password
        });

        const token = jwt.sign({
            userId : Newuser._id
        },process.env.JWT_SECRET)
    
        return res
        .status(201)
        .json({message:"User created successfully",userId : Newuser._id,token})

    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({message:"Something went wrong whie creating user"});
        
    }

   
    
   


}

export { userSignup };