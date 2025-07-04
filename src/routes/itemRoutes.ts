import express from 'express';
import { addItem, getItems } from '../controllers/itemController';
import multer from 'multer';

const router = express.Router();

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: 'public/uploads',
  filename: (_, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), addItem);
router.get('/', getItems);

export default router;
