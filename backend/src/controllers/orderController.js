import * as orderService from '../services/orderService.js';

export const getAllOrders = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const data = await orderService.getOrders({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 5
        });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi hệ thống", error: error.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const { customerName, phone, address, note, items } = req.body;
        // Trust the JWT owner, not a userId sent by the browser.
        const userId = req.user?.id;

        if (!userId || !customerName || !phone || !address) {
            return res.status(400).json({ message: "Thiếu thông tin giao hàng" });
        }
        if (!Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "Giỏ hàng rỗng" });
        }

        const newOrder = await orderService.addOrder({ userId, customerName, phone, address, note, items });

        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const getOrderDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await orderService.getOrderDetail({ id });

        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
        }

        const isOwner = String(data.order.user_id) === String(req.user?.id);
        const isAdmin = req.user?.role === "admin";
        if (!isOwner && !isAdmin) {
            return res.status(403).json({ message: "Bạn không có quyền xem đơn hàng này" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu", error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const data = await orderService.updateOrder({ id, status });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Đã xảy ra lỗi hệ thống", error: error.message });
    }
};

export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ message: "Không tìm thấy thông tin người dùng" });
        }

        const data = await orderService.getOrdersByUserId({ userId });

        res.status(200).json(data || []);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await orderService.deleteOrder({ id });

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: "Không tìm thấy đơn hàng để xóa" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const getStats = async (req, res) => {
    try {
        const data = await orderService.getOrderStats();

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};
