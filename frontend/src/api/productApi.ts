import api from "../api/axios"
import type { Product } from "../types/product";


export const fetchProductList = async () => {
    const res = await api.get(`/product/all`)
    return res.data;
}

// Thêm hàm này vào
export const fetchCreateProduct = async (productData: Omit<Product, 'id'>) => {
    const { data } = await api.post("/product/create", productData);
    return data;
}

export const fetchUpdateProduct = async ({ id, productData }: { id: string; productData: Partial<Product> }) => {
    const { data } = await api.put(`/product/update/${id}`, productData);
    return data;
};

export const fetchDeleteproduct = async (id: string) => {
    const { data } = await api.delete(`/product/delete/${id}`)
    return data;
}

export const fetchProductByCategory = async (slug: string) => {
    const { data } = await api.get(`/product/category/${slug}`)
    return data;
}


export const fetchProductDetail = async (id: string) => {
    const { data } = await api.get(`/product/${id}`)
    return data;
}
// Thêm API upload ảnh
export const fetchUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file); // 'image' phải khớp với upload.single('image') ở Backend

    const { data } = await api.post('/product/upload-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data', // BẮT BUỘC khi gửi file
        },
    });
    return data; // Trả về { imageUrl: "..." }
};

