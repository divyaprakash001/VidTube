import { v2 as cloudinary } from "cloudinary"
import fs from "fs";
// import dotenv from 'dotenv/config';

// configure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDNAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null
    const response = await cloudinary.uploader.upload(
      localFilePath, {
      resource_type: "auto"
    }
    )
    console.log("File uploaded on cloudinary. File src", response.url);
    // once the file is uploaded we will delete it from our server
    fs.unlinkSync(localFilePath)
    return response
  } catch (error) {
    fs.unlinkSync(localFilePath)
    return null;
  }
}

export { uploadOnCloudinary }