import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// 🔧 Config
const PORT = process.env.PORT || 3000;
const MONGO_URI =
  process.env.MONGO_URI ||
  "mongodb+srv://kunal:KdVygwFo0Anau8uX@hitesh.cqczgkd.mongodb.net/quickdeal"; // Add your DB name

// 🧩 Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // Optional if you serve frontend files from here

// ✅ Connect MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
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
  submittedAt: { type: Date, default: Date.now },
});

const Project = mongoose.model("Project", projectSchema);

// ✅ Test Route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running 🚀" });
});

// ✅ Submit Project Route
app.post("/api/submit-project", async (req, res) => {
  try {
    console.log("📩 Incoming project data:", req.body);
    const newProject = new Project(req.body);
    await newProject.save();
    res.json({ success: true, message: "Project saved successfully!" });
  } catch (error) {
    console.error("❌ Error saving project:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to save project", error });
  }
});

// ✅ Start Server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
