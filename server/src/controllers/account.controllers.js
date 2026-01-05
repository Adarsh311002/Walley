import { Account } from "../models/account.models.js";
import { Transaction } from "../models/transaction.models.js";
import { user } from "../models/user.models.js";
import mongoose from "mongoose";

const getBalance = async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID not found",
      });
    }

    const account = await Account.findOne({
      userId: req.userId,
    });

    const User = await user.findById(req.userId);

    if (!account) {
      return res.status(404).json({
        success: false,
        message: "Account not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      balance: account.Balance,
      name: User.fullname,
      username: User.username,
    });
  } catch (error) {
    console.error("Error fetching balance:", error);
    return res.status(500).json({
      success: false,
      message: "Error fetching balance",
      error: error.message,
    });
  }
};

const transferMoney = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { amount, to } = req.body;

    if (!to || amount <= 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid recipient or amount" });
    }

    const senderAccount = await Account.findOne({
      userId: req.userId,
    }).session(session);

    if (!senderAccount || senderAccount.Balance < amount || amount < 0) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ success: false, message: "Insufficient Balance" });
    }

    const recipientAccount = await Account.findOne({ userId: to }).session(
      session
    );

    if (!recipientAccount) {
      await session.abortTransaction();
      return res.status(404).json({ message: "Recepient not found" });
    }

    await Account.updateOne(
      {
        userId: req.userId,
      },
      {
        $inc: {
          Balance: -amount,
        },
      }
    ).session(session);

    await Account.updateOne(
      {
        userId: to,
      },
      {
        $inc: {
          Balance: amount,
        },
      }
    ).session(session);

    await Transaction.create(
      [
        {
          userId: req.userId,
          counterpartyId: to,
          type: "TRANSFER_OUT",
          amount: amount,
          status: "SUCCESS",
          description: `Transferred to user ${to}`,
        },
      ],
      { session }
    );

    await Transaction.create(
      [
        {
          userId: to,
          counterpartyId: req.userId,
          type: "TRANSFER_IN",
          amount: amount,
          status: "SUCCESS",
          description: `Received from user ${req.userId}`,
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      message: "Transfer Successful",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transfer Error:", error);
    res.status(500).json({ message: "Transfer Failed" });
  } finally {
    session.endSession();
  }
};

const getTransactions = async (req,res) => {
    try {
        const transactions = await Transaction.find({
            userId: req.userId
        }).sort({_id : -1})
        .limit(10);

        res.json(({
            success: true,
            transactions
        }))
    } catch (error) {
        res.status(500).json({ message: "Error fetching history" });
    }
}

export { getBalance, transferMoney, getTransactions };
