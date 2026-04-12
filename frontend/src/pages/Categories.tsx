//lib
import { Link } from "react-router-dom";

//components
import Footer from "../component/Footer";
import Header from "../component/Header";
import CategoryCard from "../component/CategoryCard";

//hooks
import { useCategoryList } from "../hooks/category/useCategoryList";

//types
import type { Category } from "../types/category";
import Pagination from "../component/Pagination";
import { useState } from "react";


export default function Categories() {

    const [currentPage, setCurrentPage] = useState(1);

    // gọi biến từ hook
    const { categories, pagination, isLoading: isLoadingCategories, isError: isErrorCategories } = useCategoryList(currentPage);
    //

    //kiểm tra data
    const categoryList = categories?.items || [];

    // Khi đổi trang — scroll lên đầu
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    //loading
    if (isLoadingCategories) return (
        <div className="flex justify-center items-center h-screen animate-pulse font-semibold text-gray-500">
            Đang tải danh mục...
        </div>
    );

    //error
    if (isErrorCategories) return (
        <div className="text-center py-20 text-red-500 font-bold">
            Lỗi tải dữ liệu, vui lòng thử lại sau!
        </div>
    );

    return (
        <>
            <Header />
            {/* Main */}
            <main className="container mx-auto p-2 md:p-5">
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 font-semibold text-white text-start">
                    Tất cả danh mục
                    {/* Hiển thị tổng số sản phẩm */}
                    {pagination && (
                        <span className="text-sm font-normal ml-2 opacity-80">
                            ({pagination.totalItems} danh mục)
                        </span>
                    )}
                </div>

                {/* danh sách danh mục  */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-3 bg-white shadow-sm border-x border-b rounded-b-lg gap-3 md:gap-6 justify-center items-stretch">
                    {categoryList?.map((c: Category) => (
                        <Link
                            key={c.id}
                            // link chuyển hướng
                            to={`/product/category/${c.slug}`}
                            className="w-full flex justify-center transition-transform duration-200 hover:scale-[1.02]"
                        >
                            <CategoryCard
                                id={c.id}
                                name={c.name}
                                image_url={c.image_url}
                                slug={c.slug}
                            />
                        </Link>
                    ))}
                </div>

                {/* Pagination */}
                {pagination && (
                    <Pagination
                        currentPage={pagination.currentPage}
                        totalPages={pagination.totalPages}
                        onPageChange={handlePageChange}
                    />
                )}

            </main>
            <Footer />
        </>
    )
}