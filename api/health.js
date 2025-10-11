import mongoose from "mongoose";

// MongoDB connection helper
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // Already connected
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default async function handler(req, res) {
  await connectDB();

  if (req.method === "GET") {
    return res.status(200).json({ status: "ok", message: "Serverless function is running 🚀" });
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
