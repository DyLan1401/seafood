import { Router } from 'express';
import { getAllCategory, getCategoryDetail, AddCategory, UpdateCategory, DeleteCategory } from '../controllers/categoryController.js';
const multer = require('multer');
//
const router = Router();
const upload = multer({ dest: 'uploads/' });


//router tĩnh
router.get("/all", getAllCategory);

//router action
router.post("/create", AddCategory);
router.post('/upload-image', upload.single('image'), uploadFile);

router.put("/update/:id", UpdateCategory);
router.delete("/delete/:id", DeleteCategory)

//
router.get("/:slug", getCategoryDetail);

export default router;