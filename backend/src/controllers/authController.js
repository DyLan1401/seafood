import * as authService from '../services/authService.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//đăng nhập
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await authService.findAdminByEmail(email);

        //check 
        if (!admin) {
            return res.status(401).json({ error: "Tài khoản không tồn tại" });
        }

        //check pass
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mật khẩu không chính xác" });
        }

        // 3. Tạo JWT Token
        const token = jwt.sign(
            { id: admin.id, email: admin.email },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // 4. Trả về kết quả duy nhất
        return res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            admin: { id: admin.id, email: admin.email },
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Lỗi hệ thống khi đăng nhập" });
    }
};

//đăng kí
export const Register = async (req, res) => {
    try {
        const { email, password } = req.body;


        // 1. Kiểm tra đầu vào cơ bản
        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đủ email và mật khẩu" });
        }

        //check email bằng bằng Login 
        const existingAdmin = await authService.findAdminByEmail(email);
        if (existingAdmin) {
            return res.status(409).json({ message: "Email này đã được sử dụng" });
        }

        //băm mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        //
        const data = await authService.register({ email, password: hashedPassword });

        //
        return res.status(201).json({
            message: "Đăng ký thành công",
            adminId: data.insertId
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({ message: "Lỗi hệ thống khi đăng ký" });
    }
};