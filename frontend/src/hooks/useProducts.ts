import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/productApi";

export const useProduct = (id?: string) => {
    const queryClient = useQueryClient();

    const listQuery = useQuery({
        queryKey: ["products"],
        queryFn: api.fetchProductList,
    });

    const detailQuery = useQuery({
        queryKey: ["products", "detail", id],
        queryFn: () => api.fetchProductDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000
    });

    const updateMutation = useMutation({
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


    return {

        // Data
        products: listQuery.data,
        productDetail: detailQuery.data,

        // Trạng thái loading
        isLoadingProducts: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        // Trạng thái lỗi
        isErrorProducts: listQuery.error,
        isErrorDetail: detailQuery.isError,

        // Hành động (Actions)
        updateProduct: updateMutation.mutate,
        deleteProduct: deleteMutation.mutate
    };
};