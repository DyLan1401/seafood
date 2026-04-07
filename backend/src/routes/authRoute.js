import { Router } from 'express';
import { Login, Register, userList, deleteUser, updateUser, userDetail } from '../controllers/authController.js';
//
const router = Router();

//route tĩnh
router.get("/all", userList);

//route action
router.post("/login", Login);
router.post("/register", Register);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

//
router.get("/:id", userDetail);

export default router;