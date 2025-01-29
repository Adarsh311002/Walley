import {Account} from "../models/account.models.js"
import mongoose from "mongoose";


const getBalance = async (req, res) => {
    try {
        // First check if userId exists in request
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID not found"
            });
        }

        const account = await Account.findOne({
            userId: req.userId
        });

        // Check if account exists
        if (!account) {
            return res.status(404).json({
                success: false,
                message: "Account not found for this user"
            });
        }

        // If account exists, send the balance
        return res.status(200).json({
            success: true,
            balance: account.Balance
        });

    } catch (error) {
        console.error("Error fetching balance:", error);
        return res.status(500).json({
            success: false,
            message: "Error fetching balance",
            error: error.message
        });
    }
};

const transferMoney = async(req,res) => {
    const session = await mongoose.startSession();

    session.startTransaction();

    const {amount,to} = req.body

    const account = await Account.findOne({
        userId : req.userId
    }).session(session)

    if(!account || account.Balance < amount || amount < 0 ){
        await session.abortTransaction();
        return res.status(400).json({success: false, message : "Insufficient Balance"})
    }

    const  toAccount = await Account.findOne({userId : to}).session(session)

    if(!toAccount){
        return res.status(404).json({message : "User not found"})
    }

    await Account.updateOne({
        userId : req.userId
    },
    {
        $inc : {
             Balance : -amount
        }
    }
).session(session)

    await Account.updateOne({
        userId : to
    },
{
    $inc : {
         Balance : amount
    }
}).session(session) 


    await session.commitTransaction();

    res.
    status(200)
    .json({
        message : "Transfer Successful",
    })

}


export { getBalance, transferMoney}