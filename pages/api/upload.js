import cloudinary from "cloudinary-core";
import { NextApiRequest, NextApiResponse } from "next";
import { createReadStream } from "fs";
import { cloudinaryConfig } from "../../cloudinary.config";
import nextConnect from "next-connect";
import multer from "multer";
import streamifier from "streamifier";

// Configure Cloudinary
cloudinaryConfig();

// Configure Multer
const upload = multer();

const handler = nextConnect({
  onError(error, req, res) {
    console.error("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  },
});

handler.use(upload.single("file"));

handler.post(async (req, res) => {
  try {
    const fileBuffer = req.file.buffer;
    const stream = cloudinary.v2.uploader.upload_stream(
      { resource_type: "auto" },
      function (error, result) {
        if (result) {
          res.status(200).json({ message: "Upload successful", data: result });
        } else {
          console.error(error);
          res.status(500).json({ message: "Upload failed" });
        }
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});

export default handler;
