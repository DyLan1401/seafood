import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/orderApi"


export const useOrderStats = () => {
    const query = useQuery({
        queryKey: ["order-stats"],
        queryFn: api.fetchOrderStats,
        staleTime: 5 * 60 * 1000,
    });

    return {
        stats: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
    };
};