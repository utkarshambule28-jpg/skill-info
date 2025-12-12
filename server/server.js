



import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";

import connectDB from "./config/database.js";
import { logger } from "./utils/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import skillRoutes from "./routes/skill.routes.js";
import examRoutes from "./routes/exam.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import achievementRoutes from "./routes/achievement.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import chatbotRoutes from "./routes/chatbot.routes.js";

// Load environment variables



// Read required values
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL;

// Create Express app
const app = express();

// Security middleware
app.use(helmet());

// CORS – allow frontend to communicate
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect Database
connectDB();

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/skills", skillRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/certificates", certificateRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/chatbot", chatbotRoutes);

// Error handler (always last)
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  logger.info(`🚀 Server running on port ${PORT}`);
  logger.info(`🌍 Frontend allowed: ${CLIENT_URL}`);
  logger.info(`🗄️ MongoDB: ${process.env.MONGODB_URI}`);
});
