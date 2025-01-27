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

const loginBody = zod.object({
    username: zod.string().nonempty("Username is required"),  
    password: zod.string().nonempty("Password is required")
    });

const userLogin = async(req,res) => {
    const {username,password} = req.body;

    const validateLogin = loginBody.safeParse(req.body);

    if(!validateLogin.success){
        return res
        .status(400)
        .json({
            message : "Validation failed",
            errors : validateLogin.error.errors
        })
    }

    const userExists = await user.findOne({username});

    if(!userExists){
        return res.status(404).json({message:"User not found"});
    }

    const passwordMatch = await userExists.comparePassword(password);

    if(!passwordMatch){
        return res.status(400).json({message:"Invalid username or password"})

    }
    
    const token = jwt.sign({
        userId : userExists._id
    },process.env.JWT_SECRET);

    return res
    .status(200)
    .json({message:"User logged in successfully",token})
}

const updateBody = zod.object({
    password : zod.string().optional(),
    fullname : zod.string().optional(),
    username : zod.string().optional()
})

const updateUserDetails = async(req,res) => {
    const {password,fullname,username} = req. body;

    const validateUpdateBody = updateBody.safeParse(req.body);



    if(!validateUpdateBody.success){
        return res
        .status(400)
        .json({message:"Validation failed",errors:validateUpdateBody.error.errors})
    }

    console.log(req.userId); 

    try {
        await user.updateOne({
            
            _id : req.userdId,
    
        },req.body)
    
        return res
        .status(200).json({message:"User details updated successfully"})
    } catch (error) {
        console.log("Error updating user:", error);
        
    }
}


const getUsers = async(req,res) => {
    const filter = req.query.filter || ""

    const users = await user.find({
        $or : [
            {
                fullname : { $regex : filter }
            },
            {
                 username : {$regex : filter}
            }
        ]
    })

    if(!users){
        return res
        .status(400)
        .json({
            message : "No users found"
        })
    }

    res
    .status(200)
    .json({
        user : users.map(user => ({
            username : user.username,
            fullname : user.fullname,
            _id : user._id
        }))
    })

}
    

export { userSignup,
     userLogin,
     updateUserDetails,
    getUsers }