import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/productApi";

export const useProductList = (page: number = 1) => {
    const queryList = useQuery({
        queryKey: ["products", page],
        queryFn: () => api.fetchProductList(page),
        staleTime: 5 * 60 * 1000,
        retry: 0
    });

    return {
        products: queryList.data?.items ?? [],
        pagination: queryList.data?.pagination,
        isLoading: queryList.isLoading,
        isError: queryList.isError,
    };
};