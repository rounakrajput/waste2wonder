// models/File.js
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  base64Image: { type: String }, // Add a field to store base64 encoded image data
  createdAt: { type: Date, default: Date.now },
});

const File = mongoose?.models?.File || mongoose.model('File', fileSchema);

export default File;
