import multer from 'multer';
import { Request, Response } from 'express';
import fs from 'fs';


const imageDir = './upload/images'; 

// create the directory
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imageDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  }
});

const multerConfig = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 4
  }
});

const uploadProfilePicture = async (req:Request, res:Response) => {
  try {
    if (req.file !== undefined) {
      // File was uploaded successfully
      res.status(200).json({ message: 'User uploaded profile picture' });
    } else {
      // File was not uploaded successfully
      res.status(400).json({ message: 'User profile picture upload failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export { multerConfig, uploadProfilePicture }
