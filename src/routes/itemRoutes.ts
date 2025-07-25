import express from 'express';
import { addItem, getItems,updateItem,deleteItem } from '../controllers/itemController';
import multer from 'multer';
import { verifyToken } from '../middleware/authMiddleware';

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
router.post('/', verifyToken, upload.single('image'), addItem);
router.get('/', getItems);
router.put('/:id', verifyToken, upload.single('image'), updateItem);
router.delete('/:id', verifyToken, deleteItem);


export default router;
