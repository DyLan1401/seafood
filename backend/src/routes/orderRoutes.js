import { Router } from 'express';
import { getAllOrders, createOrder, getOrderDetail, updateOrder, getMyOrders, deleteOrder, getStats } from '../controllers/orderController.js';
import { requireAdmin, verifyToken } from '../middleware/auth.middleware.js';
//
const router = Router();

//router tĩnh
router.get("/all", verifyToken, requireAdmin, getAllOrders);
router.get('/my-orders', verifyToken, getMyOrders);
router.get("/stats", verifyToken, requireAdmin, getStats);

//router action
router.post("/create", verifyToken, createOrder);
router.delete("/delete/:id", verifyToken, requireAdmin, deleteOrder);


router.put("/:id/status", verifyToken, requireAdmin, updateOrder);
//
router.get("/:id", verifyToken, getOrderDetail);
export default router;      
