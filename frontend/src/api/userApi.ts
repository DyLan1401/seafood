import api from "../api/axios"
import type { User } from "../types/user";


export const fetchUserList = async () => {
    const { data } = await api.get(`/user/all`)
    return data;
}


export const fetchLogin = async (email: string, password: string) => {
    const { data } = await api.post(`/user/login`, { email, password })
    return data;
}

export const fetchRegister = async (email: string, password: string) => {
    const { data } = await api.post(`/user/register`, { email, password })
    return data;
}

export const fetchUpdateUser = async ({ id, ...data }: User) => {
    const response = await api.put(`/user/update/${id}`, data);
    return response.data;
}

export const fetchDeleteUser = async (id: string) => {
    const { data } = await api.delete(`/user/delete/${id}`)
    return data;
}


export const fetchUserDetail = async (id: string) => {
    const { data } = await api.delete(`/user/${id}`)
    return data;
}

