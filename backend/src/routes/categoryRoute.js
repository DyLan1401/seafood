import { Router } from 'express';
import { getAllCategory } from '../controllers/categoryController.js';
//
const router = Router();
//
router.get("/all", getAllCategory);

export default router;