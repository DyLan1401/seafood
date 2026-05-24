import * as categoryService from '../services/categoryService.js';
import cloudinary from '../config/cloudinary.js';
import { unlink } from 'node:fs/promises';

export const getAllCategory = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const data = await categoryService.getCategory({
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

export const getCategoryDetail = async (req, res) => {
    try {
        const { slug } = req.params;
        const data = await categoryService.getCategoryDetail({ slug });

        if (!data) {
            return res.status(404).json({ message: "Không tìm thấy danh mục" });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const AddCategory = async (req, res) => {
    try {
        const { name, slug, image_url } = req.body;
        if (!name || !slug) {
            return res.status(400).json({ message: "Dữ liệu danh mục không hợp lệ" });
        }

        const data = await categoryService.createCategory({ name, slug, image_url });

        res.status(201).json({
            message: "Đã tạo thành công danh mục",
            id: data.insertId
        });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const UpdateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, slug, image_url } = req.body;
        if (!name || !slug) {
            return res.status(400).json({ message: "Dữ liệu danh mục không hợp lệ" });
        }

        const data = await categoryService.UpdateCategory({ id, name, slug, image_url });

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: `Không thể tìm thấy danh mục ${id}` });
        }

        res.status(200).json({ message: `Đã cập nhật thành công danh mục ${id}` });
    } catch (error) {
        res.status(500).json({
            message: "Đã xảy ra lỗi hệ thống",
            error: error.message
        });
    }
};

export const DeleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const data = await categoryService.DeleteCategory({ id });

        if (data.affectedRows === 0) {
            return res.status(404).json({ message: `Không thể tìm thấy danh mục ${id}` });
        }

        res.status(200).json({ message: `Đã xóa thành công danh mục ${id}` });
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
            folder: 'seafood_categories',
        });

        res.status(200).json({
            imageUrl: result.secure_url
        });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi upload ảnh', error: error.message });
    } finally {
        // Remove temp upload after Cloudinary receives the file.
        if (req.file?.path) {
            await unlink(req.file.path).catch(() => undefined);
        }
    }
};
