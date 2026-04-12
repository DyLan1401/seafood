import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/categoryApi";

export const useCategoryList = (page: number = 1) => {
    const queryList = useQuery({
        queryKey: ["categories", page],
        queryFn: () => api.fetchCategoryList(page),
        staleTime: 5 * 60 * 1000,
        retry: 0
    });

    return {
        categories: queryList.data,
        pagination: queryList.data?.pagination,
        isLoading: queryList.isLoading,
        isError: queryList.isError,
    };
};