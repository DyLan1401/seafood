import api from "../api/axios"
import type { Category } from "../types/category";


export const fetchCategoryList = async () => {
    const res = await api.get(`/category/all`)
    return res.data;
}


// Thêm hàm này vào
export const fetchCreateCategory = async (categoryData: Omit<Category, 'id'>) => {
    const { data } = await api.post("/category/create", categoryData);
    return data;
}

export const fetchUpdateCategory = async ({ id, categoryData }: { id: string; categoryData: Partial<Category> }) => {
    const { data } = await api.put(`/category/update/${id}`, categoryData);
    return data;
};


export const fetchDeleteCategory = async (id: string) => {
    const { data } = await api.delete(`/category/delete/${id}`)
    return data;
}


export const fetchCategoryDetail = async (id: string) => {
    const { data } = await api.get(`/category/${id}`)
    return data;
}


export const uploadCategoryImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file); // Phải khớp với upload.single('image') ở backend
    const { data } = await api.post("/category/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" }
    });
    return data; // Trả về { imageUrl: '...' }
};

