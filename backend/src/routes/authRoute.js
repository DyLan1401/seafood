import { Router } from 'express';
import { Login, Register, userList, deleteUser, updateUser, userDetail } from '../controllers/authController.js';
//
const router = Router();
//
router.get("/all", userList);


router.post("/login", Login);
router.post("/register", Register);


router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);



router.get("/:id", userDetail);

export default router;