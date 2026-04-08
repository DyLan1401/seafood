// components/admin/AdminLayout.tsx
import { Outlet } from "react-router-dom";
import Sidebar from "./sideBar";
import AdminHeader from "./AdminHeader";

export default function AdminLayout() {
    return (
        <div className="flex h-screen bg-gray-100">
            {/* 1. Sidebar bên trái - Cố định độ rộng */}
            <aside className="w-64 bg-white border-r hidden md:block">
                <Sidebar />
            </aside>

            {/* 2. Phần nội dung bên phải - Chiếm hết khoảng trống còn lại */}
            <div className="flex-1 flex flex-col overflow-hidden">
                <AdminHeader />

                <main className="flex-1 overflow-y-auto p-2">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}