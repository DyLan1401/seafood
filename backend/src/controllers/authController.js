import * as authService from '../services/authService.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const isEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

export const userList = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const data = await authService.userList({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 5
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const userDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const isOwner = String(req.user?.id) === String(id);
        const isAdmin = req.user?.role === "admin";

        if (!isOwner && !isAdmin) {
            return res.status(403).json({ error: "Bạn không có quyền xem người dùng này" });
        }

        const data = await authService.userDetail({ id });
        if (!data) {
            return res.status(404).json({ error: "Không tìm thấy user" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await authService.deleteUser({ id });

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: `Không tìm thấy user có id: ${id}` });
        }

        res.status(200).json({
            message: `Đã xóa thành công user có id: ${id}`
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, role } = req.body;

        if (email && !isEmail(email)) {
            return res.status(400).json({ message: "Email không hợp lệ" });
        }
        if (password && password.length < 6) {
            return res.status(400).json({ message: "Mật khẩu tối thiểu 6 ký tự" });
        }
        if (role && !["user", "admin"].includes(role)) {
            return res.status(400).json({ message: "Role không hợp lệ" });
        }

        const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
        const data = await authService.updateUser({ id, email, password: passwordHash, role });

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: `Không tìm thấy user có id: ${id}` });
        }

        res.status(200).json({
            message: `Đã cập nhật thành công user có id: ${id}`
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập email và mật khẩu" });
        }

        const user = await authService.findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Tài khoản không tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Mật khẩu không chính xác" });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        return res.status(200).json({
            message: "Đăng nhập thành công",
            token,
            user: { id: user.id, email: user.email, role: user.role },
        });
    } catch (error) {
        return res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const Register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Vui lòng nhập đủ email và mật khẩu" });
        }
        if (!isEmail(email) || password.length < 6) {
            return res.status(400).json({ message: "Email hoặc mật khẩu không hợp lệ" });
        }

        const existingUser = await authService.findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: "Email này đã được sử dụng" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const data = await authService.register({ email, password: hashedPassword });

        return res.status(201).json({
            message: "Đăng ký thành công",
            userId: data.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};
