// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // optional if you serve index.html

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://kunal:KdVygwFo0Anau8uX@hitesh.cqczgkd.mongodb.net/";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const projectSchema = new mongoose.Schema({
  projectTitle: String,
  projectDescription: String,
  projectCategory: String,
  projectDeadline: String,
  projectBudget: Number,
  email: String,
  phone: String,
  submittedAt: { type: Date, default: Date.now }
});

const Project = mongoose.model("Project", projectSchema);

// ✅ API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

app.post("/api/submit-project", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.json({ success: true, message: "Project saved successfully!" });
  } catch (error) {
    console.error("Error saving project:", error);
    res.status(500).json({ success: false, message: "Failed to save project" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
