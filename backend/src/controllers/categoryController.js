import * as categoryService from '../services/categoryService.js';

//lấy tất cả danh mục
export const getAllCategory = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const data = await categoryService.getCategory({
            page: parseInt(page) || 1,
            limit: parseInt(limit) || 10
        });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: "Lỗi khi lấy dữ liệu" });
    }
};
