import { Router } from 'express';
import { getAllCategory, getCategoryDetail, AddCategory, UpdateCategory, DeleteCategory } from '../controllers/categoryController.js';
import { verifyToken } from '../middleware/auth.middleware.js';
//
const router = Router();
//
router.get("/all", getAllCategory);
router.get("/:slug", getCategoryDetail);
router.post("/create", AddCategory);
router.put("/update/:id", UpdateCategory);
router.delete("/delete/:id", DeleteCategory)
export default router;