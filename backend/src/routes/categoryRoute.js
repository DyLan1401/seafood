import { Router } from 'express';
import { getAllCategory, getCategoryDetail, AddCategory, UpdateCategory, DeleteCategory, uploadFile } from '../controllers/categoryController.js';
import { requireAdmin, verifyToken } from '../middleware/auth.middleware.js';
import multer from 'multer';
//
const router = Router();
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) return cb(new Error('Chỉ cho phép upload file ảnh'));
        cb(null, true);
    }
});


//router tĩnh
router.get("/all", getAllCategory);

//router action
router.post("/create", verifyToken, requireAdmin, AddCategory);
router.post('/upload-image', verifyToken, requireAdmin, upload.single('image'), uploadFile);
router.put("/update/:id", verifyToken, requireAdmin, UpdateCategory);
router.delete("/delete/:id", verifyToken, requireAdmin, DeleteCategory)

//
router.get("/:slug", getCategoryDetail);

export default router;
