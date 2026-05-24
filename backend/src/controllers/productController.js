import * as productService from '../services/productService.js';
import cloudinary from '../config/cloudinary.js';
import { unlink } from 'node:fs/promises';

const isPositiveNumber = (value) => Number.isFinite(Number(value)) && Number(value) >= 0;

export const getProducts = async (req, res) => {
    try {
        const { search, category, page, limit } = req.query;
        const data = await productService.getAllProducts({
            search: search || "",
            category: category || "",
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

export const getProductDetail = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await productService.getProductDetail({ id });

        if (!data) {
            return res.status(404).json({ message: `Không tìm thấy sản phẩm id: ${id}` });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const getProductsByCategory = async (req, res) => {
    try {
        const { slug } = req.params;
        const data = await productService.getProductsByCategory({ slug });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id } = req.body;
        if (!name || !slug || !isPositiveNumber(price) || !isPositiveNumber(stock) || !category_id) {
            return res.status(400).json({ message: "Dữ liệu sản phẩm không hợp lệ" });
        }

        const data = await productService.addProduct({ name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id });

        res.status(201).json({
            message: "Đã tạo thành công sản phẩm",
            id: data.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id } = req.body;
        if (!name || !slug || !isPositiveNumber(price) || !isPositiveNumber(stock) || !category_id) {
            return res.status(400).json({ message: "Dữ liệu sản phẩm không hợp lệ" });
        }

        const data = await productService.updateProduct({ id, name, slug, price, sale_price, stock, image_url, description, origin, weight, category_id });

        if (data.affectedRows === 0) {
            return res.status(404).json({
                message: `Không thể cập nhật sản phẩm id: ${id}`,
            });
        }

        res.status(200).json({
            message: `Đã cập nhật sản phẩm id: ${id}`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await productService.deleteProduct({ id });

        if (data.affectedRows === 0) {
            return res.status(404).json({
                message: "Không tìm thấy sản phẩm để xóa",
            });
        }

        res.status(200).json({
            message: `Đã xóa thành công sản phẩm id: ${id}`,
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const uploadFile = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Không có file nào được chọn' });
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'seafood_products',
        });

        res.status(200).json({
            imageUrl: result.secure_url
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload ảnh', error: error.message });
    } finally {
        // Multer writes to disk before Cloudinary upload, so remove the temp file.
        if (req.file?.path) {
            await unlink(req.file.path).catch(() => undefined);
        }
    }
};
