import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as api from "../api/categoryApi";

export const useCategory = (id?: string) => {
    const queryClient = useQueryClient();

    const listQuery = useQuery({
        queryKey: ["categories"],
        queryFn: api.fetchCategoryList,
    });

    const detailQuery = useQuery({
        queryKey: ["categories", "detail", id],
        queryFn: () => api.fetchCategoryDetail(id!),
        enabled: !!id,
        staleTime: 10 * 60 * 1000
    });

    const updateMutation = useMutation({
        mutationFn: api.fetchUpdateCategory,
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ["categories"] });

            if (id) queryClient.invalidateQueries({ queryKey: ["categories", "detail", id] });
        }
    });

    const deleteMutation = useMutation({
        mutationFn: api.fetchDeleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["categories"] });
        }
    });


    return {

        // Data
        categories: listQuery.data,
        CategoryDetail: detailQuery.data,

        // Trạng thái loading
        isLoadingCategory: listQuery.isLoading,
        isLoadingDetail: detailQuery.isLoading,
        isUpdating: updateMutation.isPending,
        isDeleting: deleteMutation.isPending,

        //Trạng thái lỗi
        isErrorCategory: listQuery.isError,
        isErrorDetail: detailQuery.isError,


        // Hành động (Actions)
        updateCategory: updateMutation.mutate,
        deleteCategory: deleteMutation.mutate
    };
};