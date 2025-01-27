import mongoose,{Schema} from "mongoose";


const accountSchema = new Schema({
    userId : {
        type : mongoose.Types.ObjectId,
        ref : "user",
        required : true
    },
    
     Balance : {
            type : Number,
            required : true,
            default : 0
        }
    
    
},{timestamps: true})

export const Account = mongoose.model("account", accountSchema);
