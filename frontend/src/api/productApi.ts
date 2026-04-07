import api from "../api/axios"


export const fetchProductList = async () => {
    const res = await api.get(`/product/all`)
    return res.data;
}

export const fetchUpdateProduct = async (id: string) => {
    const { data } = await api.put(`/product/update/${id}`)
    return data;
}

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

