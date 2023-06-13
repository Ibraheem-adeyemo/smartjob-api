require('dotenv').config();
import cloudinary from 'cloudinary';

const CLOUD_NAME=process.env.CLOUD_NAME 
const CLOUDINARY_API_KEY=process.env.CLOUDINARY_API_KEY  
const CLOUDINARY_API_SECRET=process.env.CLOUDINARY_API_SECRET 
const environment = process.env.NODE_ENV

cloudinary.config({ 
    cloud_name: CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
  });

export const uploadToCloudinary = async (locaFilePath, cloudFolder) => {
    try {
        // locaFilePath :
        // path of image which was just uploaded to "uploads" folder
        const mainFolderName = environment
        const filePathOnCloudinary = `${mainFolderName}/${cloudFolder}/${locaFilePath}`
    // filePathOnCloudinary :
    // path of image we want when it is uploded to cloudinary
    // console.log(cloudinaryConfig)
    const result = await cloudinary.uploader.upload(locaFilePath,{"public_id":filePathOnCloudinary})
      
      return {
        message: "Success",
        url:result
      };
    } catch (error) {
        console.log(error)
        return {message: "Fail",};        
    }
  }