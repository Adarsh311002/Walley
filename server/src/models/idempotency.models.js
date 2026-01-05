import mongoose from "mongoose";

const idempotencySchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      required: true,
    },
    response: {
      type: Object, //jsonstore
      required: true,
    },
  },
  { timestamps: true }
);

idempotencySchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

export const IdempotencyKey = mongoose.model(
  "IdempotencyKey",
  idempotencySchema
);
