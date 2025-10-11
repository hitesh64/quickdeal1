import mongoose from "mongoose";

// MongoDB connection helper
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // Already connected
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

// Project Schema
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

const Project = mongoose.models.Project || mongoose.model("Project", projectSchema);

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "POST") {
    try {
      const newProject = new Project(req.body);
      await newProject.save();
      return res.status(200).json({ success: true, message: "Project saved successfully!" });
    } catch (error) {
      console.error("❌ Error saving project:", error);
      return res.status(500).json({ success: false, message: "Failed to save project", error });
    }
  } else if (req.method === "GET") {
    return res.status(200).json({ status: "ok", message: "Serverless function is running 🚀" });
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
