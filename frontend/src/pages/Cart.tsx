//lib
import { HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";

//components
import Header from "../component/Header";
import Footer from "../component/Footer";
import Button from "../component/Button";

//zustand
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";


export default function Cart() {

    // gọi biến từ store 
    const { isAuth } = useAuthStore();
    const { items, increaseQty, decreaseQty, removeItem, getTotal } = useCartStore();

    //kiểm tra đăng nhập
    if (!isAuth) {
        return (
            <>
                <Header />
                <div className="container mx-auto py-20 text-center">
                    <p className="text-xl mb-4 font-medium">Bạn cần đăng nhập để xem giỏ hàng của mình</p>
                    <Link to="/login">
                        <Button text="Đăng nhập ngay" />
                    </Link>
                </div>
                <Footer />
            </>
        );
    };

    //kiểm tra số lượng
    if (items.length === 0)
        return (
            <>
                <Header />
                <div className="flex flex-col justify-center items-center">
                    <p className="text-center p-5">giỏ hàng của bạn chưa có gì hết !!!</p>

                    <Link to="/" className="flex justify-center p-6">
                        <Button text="Hãy đi dạo biển và chọn cá thôi nào !!!" />
                    </Link>
                </div>


                <Footer />
            </>
        );


    return (
        <>
            {/* Header */}
            <Header />
            {/* Main */}
            <div className=" container mx-auto max-w-4xl">
                {/*  */}
                <div className=" flex flex-col justify-center items-center">
                    <div className="text-center  mt-2 text-2xl font-extrabold p-2 bg-amber-500 ">Chúng tôi biết bạn có nhiều lựa chọn, cám ơn bạn đã chọn sản phẩm của chúng tôi</div>
                    <h1 className="text-2xl  text-center font-bold mb-4">Giỏ hàng</h1>
                    <p className="  text-center mb-4 p-2 border-b-4 ">Giỏ hàng có {items.length} sản phẩm</p>
                </div>

                {/* sản phẩm trong giỏ hàng */}
                <div className="flex flex-col  justify-center">
                    {items.map((item) => (
                        <div
                            key={item.productId}
                            className="border rounded-2xl p-4 mb-2 flex justify-between "
                        >
                            <div>
                                {/* hình ảnh */}
                                <div className="w-20 h-20 rounded-xl">{item.image_url ? (<img className="object-cover rounded-xl w-full h-full" src={item.image_url} />) : null}</div>
                            </div>
                            <div className="justify-center flex flex-col items-start">
                                {/* tên */}
                                <div className="font-semibold text-lg">{item.name}</div>
                                {/* giá mỗi sản phẩm */}
                                <div>{item.price.toLocaleString()}đ</div>

                                {/* tăng giảm số lượng */}
                                <div className=" border-2  border-gray-600 flex justify-around items-center">
                                    <button
                                        className=" px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer "
                                        onClick={() => decreaseQty(item.productId)}>
                                        -
                                    </button>
                                    <span className=" bg-gray-200 border-x-2 text-gray-800  px-4 py-1  ">{item.qty}</span>
                                    <button
                                        className="px-3 py-1 hover:bg-gray-100 transition-colors cursor-pointer "
                                        onClick={() => increaseQty(item.productId)}>
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* nút xóa  */}
                            <div className="flex flex-col items-end justify-between">
                                <button
                                    onClick={() => removeItem(item.productId)}
                                    className="cursor-pointer text-gray-400 hover:text-red-500 transition-colors p-1"
                                    title="Xóa khỏi giỏ hàng"
                                >
                                    <HiOutlineX size={22} />
                                </button>
                                {/*tổng tiền của mỗi sản phẩm  */}
                                <p>
                                    {(item.price * item.qty).toLocaleString()}đ
                                </p>
                            </div>
                        </div>
                    ))}

                    {/* Tổng tiền tất cả sản phẩm */}
                    <div className="text-right my-4  text-xl font-bold">
                        Tổng: {getTotal().toLocaleString()}đ
                    </div>

                    {/* Chuyển hướng */}
                    <div className="flex gap-4 ">
                        <Link to="/checkout"
                            className="w-full ">
                            <button
                                className="bg-[#2C8DE0] hover:text-[#2C8DE0] ease-in-out duration-500    border-2  hover:bg-white  rounded-lg text-white w-full py-4">Tiếp tục thanh toán</button>
                        </Link>
                        <Link to="/"
                            className="w-full ">
                            <button
                                className="bg-[#2C8DE0] hover:text-[#2C8DE0] ease-in-out duration-500    border-2  hover:bg-white  rounded-lg text-white w-full py-4">trở lại mua hàng</button>
                        </Link>
                    </div>

                </div>
            </div>
            <Footer />
        </>

    );
}