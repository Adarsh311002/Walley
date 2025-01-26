import express from "express";

const app = express();

app.use(express.json());

// Import routes
import healthCheckRoutes from "./routes/healthcheck.routes.js";

// Use routes
app.use("/api/v1/healthcheck", healthCheckRoutes);


// Test route
app.get("/test", (req, res) => {
    res.send("Test route is working");
  });

export { app };