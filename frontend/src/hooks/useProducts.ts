import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/productApi";

export const useProduct = (id?: string, slug?: string) => {
    const queryClient = useQueryClient();

    const listQuery = useQuery({
        queryKey: ["products"],
        queryFn: api.fetchProductList,
    });

    const listProductByCategory = useQuery({
        queryKey: ["product-by-category", slug],
        queryFn: () => api.fetchProductByCategory(slug!),
        enabled: !!slug,
        staleTime: 10 * 60 * 1000

    });



    const detailQuery = useQuery({
        queryKey: ["products", "detail", id],
        queryFn: () => api.fetchProductDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000
    });

    // Thêm Create Mutation
    const createMutation = useMutation({
        mutationFn: api.fetchCreateProduct, // Đảm bảo trong api/productApi.ts đã export hàm này
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });

    const updateMutation = useMutation({
        // API này nhận object { id, productData }
        mutationFn: api.fetchUpdateProduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
            if (id) queryClient.invalidateQueries({ queryKey: ["products", "detail", id] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteproduct,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["products"] });
        }
    });

    // Thêm mutation upload ảnh
    const uploadMutation = useMutation({
        mutationFn: api.fetchUploadImage,
    });
    return {

        // Data
        products: listQuery.data,
        productDetail: detailQuery.data,
        productByCategory: listProductByCategory,

        // Trạng thái loading
        isLoadingProductByCategory: listProductByCategory.isLoading,
        isLoadingProducts: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isCreating: createMutation.isPending,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,
        isUploadingImage: uploadMutation.isPending,

        // Trạng thái lỗi
        isErrorProductByCategory: listProductByCategory.isError,
        isErrorProducts: listQuery.isError,
        isErrorDetail: detailQuery.isError,
        // Hành động (Actions)
        uploadImage: uploadMutation.mutateAsync, // Dùng mutateAsync để đợi lấy URL
        createProduct: createMutation.mutate,
        updateProduct: updateMutation.mutate,
        deleteProduct: deleteMutation.mutate
    };
};