import connectDB from '@/middleware/connectDB'; 
import File from '@/Models/File'; 

// API route handler for base64 image upload
const uploadHandler = async (req, res) => {
  try {
    const { description, location, img_background } = req.body;

    // Save file information to MongoDB
    const file = new File({
      filename: Date.now() + '.png', // You can set the filename dynamically here
      description,
      location,
      base64Image: img_background, // Assuming img_background contains base64 encoded image data
    });
    
    await file.save();

    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Failed to upload file' });
  }
};

export default connectDB(uploadHandler);
