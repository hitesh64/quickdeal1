import mongoose from "mongoose";

// 🔧 MongoDB connection helper
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // reuse existing connection
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
};

// 🔧 Project schema
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

// 🔧 Serverless handler
export default async function handler(req, res) {
  try {
    await connectDB();

    if (req.method === "POST") {
      const newProject = new Project(req.body);
      await newProject.save();
      return res.status(200).json({ success: true, message: "Project saved successfully!" });
    }

    if (req.method === "GET") {
      return res.status(200).json({ status: "ok", message: "Serverless function running 🚀" });
    }

    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  } catch (error) {
    console.error("❌ Serverless function error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error });
  }
}
