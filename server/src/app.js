import express from "express";
import cors from "cors";
import { globalLimiter, authLimiter } from "./middlewares/rateLimiter.js";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));

app.use(express.json());
app.use(globalLimiter);

import healthCheckRoutes from "./routes/healthcheck.routes.js";
import userRoutes from "./routes/user.routes.js";
import accountRoutes from "./routes/account.routes.js"
import paymentRoute from "./routes/payment.routes.js"

app.use("/api/v1/healthcheck", healthCheckRoutes);
app.use("/api/v1/users",authLimiter, userRoutes);
app.use("/api/v1/account",accountRoutes);
app.use("/api/v1/payment", paymentRoute);

app.get("/test", (req, res) => {
    res.send("Test route is working");
  });

export { app };