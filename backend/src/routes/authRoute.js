import { Router } from 'express';
import { Login, Register, userList, deleteUser, updateUser, userDetail } from '../controllers/authController.js';
import { requireAdmin, verifyToken } from '../middleware/auth.middleware.js';


const router = Router();

//route tĩnh
router.get("/all", verifyToken, requireAdmin, userList);

//route action
router.post("/login", Login);
router.post("/register", Register);
router.put("/update/:id", verifyToken, requireAdmin, updateUser);
router.delete("/delete/:id", verifyToken, requireAdmin, deleteUser);

//
router.get("/:id", verifyToken, userDetail);

export default router;
