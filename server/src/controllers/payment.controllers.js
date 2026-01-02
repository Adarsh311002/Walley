import Razorpay from "razorpay";
import crypto from "crypto";
import { Account } from "../models/account.models.js";
import { Transaction } from "../models/transaction.models.js";
import mongoose from "mongoose";



const createOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });
    
    const { amount } = req.body;
    //works in paise 100paise=1rs
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyPayment = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid signature" });
    }

    await Account.updateOne(
      { userId: req.userId },
      { $inc: { Balance: amount } }
    ).session(session);

    await Transaction.create(
      [
        {
          userId: req.userId,
          type: "DEPOSIT",
          amount: amount,
          status: "SUCCESS",
          gatewayId: razorpay_payment_id,
          description: "Razorpay Deposit",
        },
      ],
      { session }
    );

    await session.commitTransaction();
    res.json({ success: true, message: "Payment Verified" });

  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: "Internal Server Error" });

  } finally {
    session.endSession();
  }
};

export { createOrder, verifyPayment };
