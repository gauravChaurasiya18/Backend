import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import authRoute from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();
const app = express();

// Connect MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Mongo error:", err));

// CORS with hardcoded frontend URL
app.use(
  cors({
    origin: "https://freelance-website-neon.vercel.app", // your frontend URL
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// API routes
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Something went wrong!",
  });
});


export default app;
