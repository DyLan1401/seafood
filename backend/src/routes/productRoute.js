import { Router } from 'express';
import { getProducts, getProductDetail, getProductsByCategory, createProduct, updateProduct, deleteProduct, uploadFile } from '../controllers/productController.js';
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
router.get("/all", getProducts);

//router action
router.post("/create", verifyToken, requireAdmin, createProduct);
router.put("/update/:id", verifyToken, requireAdmin, updateProduct);
router.delete("/delete/:id", verifyToken, requireAdmin, deleteProduct);
//
router.get("/category/:slug", getProductsByCategory);
router.post('/upload-image', verifyToken, requireAdmin, upload.single('image'), uploadFile);

router.get("/:id", getProductDetail);
export default router;
