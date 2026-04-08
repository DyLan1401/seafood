import { useAuthStore } from "../../store/authStore";
import { LogOut } from 'lucide-react';

export default function AdminHeader() {

    const { user, logout } = useAuthStore();

    if (user?.role !== "admin") return (
        <div>Bạn không có quyền để truy cập !!!</div>
    )


    return (
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm">
            <h1 className="text-lg font-semibold text-gray-800">Quản trị Hệ thống</h1>

            <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Xin chào,{user?.email}</span>
                <div
                    onClick={() => { logout() }}
                    className=" text-sm cursor-pointer  text-red-600 hover:text-b   lack transition">
                    <LogOut />
                </div>

            </div>
        </header>
    );
}