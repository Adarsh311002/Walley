import express from "express";
import cors from "cors";

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json());

// Import routes
import healthCheckRoutes from "./routes/healthcheck.routes.js";
import userRoutes from "./routes/user.routes.js";
import accountRoutes from "./routes/account.routes.js"

// Use routes
app.use("/api/v1/healthcheck", healthCheckRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/account",accountRoutes);


// Test route
app.get("/test", (req, res) => {
    res.send("Test route is working");
  });

export { app };