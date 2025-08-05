import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import barangRouter from "../routers/barang.router.js";
import userRouter from "../routers/user.router.js";
import orderRouter from "../routers/order.router.js";
import uploadRouter from "../routers/upload.router.js";
import { dbconnect } from "../config/database.config.js";

// Initialize database connection
dbconnect();

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: [
      "http://localhost:3000",
      "https://your-frontend.vercel.app", // Update setelah frontend deploy
    ],
  })
);

// Routes
app.use("/api/barang", barangRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/upload", uploadRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend API is running!',
    endpoints: [
      '/api/barang',
      '/api/users', 
      '/api/orders',
      '/api/upload'
    ]
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Export untuk Vercel (PENTING!)
export default app;