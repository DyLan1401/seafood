import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import { useToast } from "../hooks/useToast";
import { ToastContainer } from "../component/ToastContainer";
import { useForm } from "react-hook-form";
import { userInput } from "../lib/validitions";
import { useUsers } from "../hooks/useUsers";

export default function Register() {
    const navigate = useNavigate();


    const { toasts, show } = useToast();
    const { register, handleSubmit, formState: { errors } } = useForm(userInput);
    const { Register, isRegistering } = useUsers();

    const handleRegister = (data: any) => {
        Register(data, {
            onSuccess: () => {
                show("Đăng kí thành công!", "success");
                navigate("/login")

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
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
                <div className="w-full max-w-md bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-gray-100">

                    <div className="text-center mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#BF4E2C]">Đăng kí</h1>
                        <p className="text-gray-500 text-sm mt-2">Tạo tài khoản để trải nghiệm chi tiết hơn</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="example@gmail.com"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                {...register("email", { required: "Vui lòng điền email" })}
                            />
                            {errors.email && <span className="error text-red-500">{errors.email.message as string}</span>}

                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                            <input
                                type="password"
                                placeholder="Tối thiểu 6 ký tự"
                                className="w-full border border-gray-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-[#2C8DE0] focus:border-transparent transition-all"
                                {...register("password", { required: "Vui lòng điền mật khẩu" })}
                            />
                            {errors.password && <span className="error text-red-500">{errors.password.message as string}</span>}

                        </div>

                        <button
                            onClick={handleSubmit(handleRegister)}
                            className="w-full bg-[#2C8DE0] hover:bg-[#1a6fb8] text-white font-bold py-3 rounded-xl shadow-lg transform transition active:scale-95 mt-2"
                        >
                            {isRegistering ? "Đăng tạo tài khoản" : "Đăng kí"}
                        </button>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                        <p className="text-sm text-gray-600">
                            Đã có tài khoản?
                            <button
                                onClick={() => navigate("/login")}
                                className="font-bold text-[#2C8DE0] hover:underline"
                            >
                                Đăng nhập ngay
                            </button>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}