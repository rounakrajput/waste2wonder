import connectDB from "@/middleware/connectDB";
import File from "@/Models/File";

const uploadHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed!" });
  }

  const { description, location, img_background } = req.body ?? {};

  if (!description || !location || !img_background) {
    return res
      .status(403)
      .json({ success: false, message: "Please fill up all details!" });
  }

  try {
    // Save file information to MongoDB
    const file = await File.create({
      filename: generateFileName("png"),
      description,
      location,
      base64Image: img_background,
    });
    
    if (!file) {
      throw new Error("Failed to save file");
    }
    
    res.status(200).json({ success: true, message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ success: false, message: "Failed to upload file" });
  }
};

// Generate a unique filename
const generateFileName = (extension) => {
  return `${Date.now()}-${Math.floor(Math.random() * 10000)}.${extension}`;
};

export default connectDB(uploadHandler);
