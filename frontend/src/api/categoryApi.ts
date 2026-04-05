import api from "../api/axios"


export const fetchCategoryList = async () => {
    const res = await api.get(`/category/all`)
    return res.data;
}

export const fetchUpdateCategory = async (id: string) => {
    const { data } = await api.put(`/category/update/${id}`)
    return data;
}

export const fetchDeleteCategory = async (id: string) => {
    const { data } = await api.delete(`/category/delete/${id}`)
    return data;
}


export const fetchCategoryDetail = async (id: string) => {
    const { data } = await api.delete(`/category/${id}`)
    return data;
}

