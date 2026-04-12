interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    if (totalPages <= 1) return null;

    // Tạo mảng số trang để render
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex items-center justify-center gap-2 py-6">
            {/* Nút Trước */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-[#2C8DE0] hover:text-white hover:border-[#2C8DE0]
                    transition-all"
            >
                ← Trước
            </button>

            {/* Số trang */}
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-10 h-10 rounded-xl text-sm font-bold transition-all
                        ${page === currentPage
                            ? "bg-[#2C8DE0] text-white border border-[#2C8DE0]"
                            : "border border-gray-200 hover:bg-gray-50"
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Nút Sau */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm font-semibold
                    disabled:opacity-40 disabled:cursor-not-allowed
                    hover:bg-[#2C8DE0] hover:text-white hover:border-[#2C8DE0]
                    transition-all"
            >
                Sau →
            </button>
        </div>
    );
}