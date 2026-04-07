//hooks
import { useOrders } from "../hooks/useOrder";

//zustand
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/useToastStore";

//type
import type { Order } from "../types/order";


const STATUSES = ["pending", "confirmed", "shipping", "done", "cancelled"];

const STATUS_LABEL: Record<string, string> = {
    pending: "Chờ xác nhận",
    confirmed: "Đã xác nhận",
    shipping: "Đang giao",
    done: "Đã giao",
    cancelled: "Đã hủy",
};

const STATUS_COLOR: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipping: "bg-purple-100 text-purple-700",
    done: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
};



export default function Dashboard() {

    const showToast = useToastStore((state) => state.show);
    const { user, logout } = useAuthStore();
    const { orders, isLoadingOrder, updateOrder, isUpdating } = useOrders();





    return (
        <div>
            <div className="w-full h-16 bg-blue-900 text-white text-sm text-right p-4" >
                <div>  Hi, {user?.email}</div>
                <button onClick={() => { logout() }} className=" text-sm cursor-pointer  text-red-600 hover:text-black transition">Đăng xuất</button>

            </div >
            <div className="min-h-screen bg-gray-50 px-6">

                <h1 className="text-2xl font-bold text-[#BF4E2C] mb-6">Quản lý đơn hàng</h1>

                {isLoadingOrder ? (
                    <p className="text-gray-500">Đang tải...</p>
                ) : orders.length === 0 ? (
                    <p className="text-gray-500">Không có đơn hàng nào.</p>
                ) : (
                    <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                        <table className="w-full text-sm bg-white">
                            <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                                <tr>
                                    <th className="px-4 py-3 text-left">ID</th>
                                    <th className="px-4 py-3 text-left">Khách hàng</th>
                                    <th className="px-4 py-3 text-left">SĐT</th>
                                    <th className="px-4 py-3 text-left">Địa chỉ</th>
                                    <th className="px-4 py-3 text-left">Ghi chú</th>
                                    <th className="px-4 py-3 text-left">Tổng tiền</th>
                                    <th className="px-4 py-3 text-left">Trạng thái</th>
                                    <th className="px-4 py-3 text-left">Ngày đặt</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {orders.map((order: Order) => (
                                    <tr key={order.id} className="hover:bg-gray-50 transition">
                                        <td className="px-4 py-3 font-medium">#{order.id}</td>
                                        <td className="px-4 py-3">{order.customer_name}</td>
                                        <td className="px-4 py-3">{order.phone}</td>
                                        <td className="px-4 py-3 max-w-37.5 truncate">{order.address}</td>
                                        <td className="px-4 py-3 max-w-30 truncate">{order.note || "—"}</td>
                                        <td className="px-4 py-3 font-semibold text-[#BF4E2C]">
                                            {order.total.toLocaleString()}đ
                                        </td>
                                        <td className="px-4 py-3">
                                            <select
                                                value={order.status}
                                                onChange={(e) => {
                                                    const newStatus = e.target.value
                                                    updateOrder(
                                                        { id: order.id, status: newStatus },
                                                        {
                                                            onSuccess: () => showToast(`Đã chuyển sang: ${STATUS_LABEL[newStatus]}`, "success"),
                                                            onError: () => showToast("cập nhật thất bại", "error")
                                                        }
                                                    );
                                                }}
                                                className={`text-xs font-medium rounded-lg px-2 py-1 border-0 outline-none cursor-pointer 
                                                ${STATUS_COLOR[order.status]}
                                                ${isUpdating ? "opacity-50 cursor-not-allowed" : "opacity-100"}`}

                                            >
                                                {STATUSES.map((s) => (
                                                    <option key={s} value={s}>{STATUS_LABEL[s]}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td className="px-4 py-3 text-gray-500">
                                            {new Date(order.created_at).toLocaleDateString("vi-VN")}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div >
    );
}