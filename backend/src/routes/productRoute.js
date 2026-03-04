import { Router } from 'express';
import { getProducts, getProductDetail } from '../controllers/productController.js';
//
const router = Router();
//
router.get("/all", getProducts);
router.get("/:slug", getProductDetail);

export default router;