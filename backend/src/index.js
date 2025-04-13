import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware to parse JSON
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Connect to database first, then start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("❌ Failed to connect to database", error);
});
