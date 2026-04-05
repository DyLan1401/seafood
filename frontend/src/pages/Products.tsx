import Footer from "../component/Footer";
import Header from "../component/Header";
import ProductCard from "../component/ProductCard";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useProduct } from "../hooks/useProducts";
import type { Product } from "../types/product";
export default function Products() {
    const [searchParams] = useSearchParams();
    const searchQuery = (searchParams.get("search") || "").toLowerCase();
    const { products, isErrorProducts, isLoadingProducts } = useProduct();


    const filtredProducts = products?.filter((p: Product) =>
        p.name.toLowerCase().includes(searchQuery))

    if (isLoadingProducts) return (
        <div className="flex justify-center items-center min-h-[400px] font-medium text-gray-500">
            Đang tải sản phẩm...
        </div>
    );

    if (isErrorProducts) return (
        <div className="text-center py-10 text-red-500">
            Lỗi tải dữ liệu. Vui lòng thử lại.
        </div>
    );

    return (
        /**/
        <div className="container mx-auto px-2 sm:px-4">
            <Header />
            <main className="w-full h-full py-4 md:py-6">
                {/*  */}
                <div className="text-lg md:text-xl rounded-t-lg bg-[#BF4E2C] p-3 md:p-4 font-semibold text-white text-start uppercase">
                    {searchQuery ? `Kết quả tìm kiếm: "${searchQuery}"` : "Tất cả sản phẩm"}
                </div>

                {/*  */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 p-2 md:p-4 bg-[#FFF2E8] rounded-b-lg border-x border-b border-[#e5e7eb]">
                    {filtredProducts && filtredProducts.length > 0 ? (
                        filtredProducts.map((p: Product) => (
                            <Link
                                key={p.id}
                                to={`/product/${p.slug}`}
                                className="w-full flex justify-center hover:scale-[1.02] transition-transform"
                            >
                                <ProductCard
                                    name={p.name}
                                    image_url={p.image_url}
                                    price={p.price}
                                    sale_price={p.sale_price}
                                />
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full py-20 text-center text-gray-500 italic">
                            Không tìm thấy sản phẩm nào phù hợp.
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    )
}