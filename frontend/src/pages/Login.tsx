import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useUsers } from "../hooks/useUsers";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../component/ToastContainer";
import { userInput } from "../lib/validitions";

export default function Login() {
    const navigate = useNavigate();

    const { toasts, show } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm(userInput);
    const { login, isLoggingIn } = useUsers();

    const handleLogin = (data: any) => {
        login(data, {
            onSuccess: (res) => {
                show("Đăng nhập thành công!", "success");
                if (res.role === "admin") {
                    navigate("/dashboard")
                } else {
                    navigate("/");
                }

            },
            onError: (error: any) => {
                // Xử lý lỗi riêng cho UI nếu cần
                const errorMsg = error?.response?.data?.message || "Sai email hoặc mật khẩu";
                show(errorMsg, "error");
            }
        });
    };
    return (

        <div>
            <ToastContainer toasts={toasts} />
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
                <div className="w-full max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100">

                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#BF4E2C]">Đăng nhập</h1>
                        <p className="text-gray-500 text-sm mt-2">Đăng nhập để trải nghiệm chi tiết hơn !!!</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                placeholder="example@gmail.com"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                type="email"
                                {...register("email", { required: "Email là bắt buộc" })}
                            />
                            {errors.email && <span className="error">{errors.email.message as string}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                placeholder="••••••••"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                type="password"
                                {...register("password", { required: "Password là bắt buộc" })}
                            />
                            {errors.password && <span className="error">{errors.password.message as string}</span>}
                        </div>

                        <button
                            onClick={handleSubmit(handleLogin)}
                            className="w-full bg-[#2C8DE0] hover:bg-[#1a6fb8] text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 mt-2"

                        >
                            {isLoggingIn ? "Đang chuyển trang" : "Đăng nhập"}
                        </button>
                    </div>

                    <div className="mt-6 text-center">
                        <button
                            onClick={() => navigate("/")}
                            className="text-sm text-gray-500 hover:text-[#BF4E2C] transition"
                        >
                            ← Quay lại trang chủ
                        </button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}