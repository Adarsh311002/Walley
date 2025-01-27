import mongoose, { Schema} from "mongoose";
import bcrypt from "bcrypt";


const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,

    },
    fullname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minLength : 6,
    },

    
       
    

},{timestamps : true})


userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
       return next();
    }

    this.password = await bcrypt.hash(this.password,12);
    next()
})

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password)
}

export const user = mongoose.model("user",userSchema)