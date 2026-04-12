import { useQuery } from "@tanstack/react-query";
import * as api from "../../api/userApi";

export const useUserList = (page: number = 1) => {
    const queryList = useQuery({
        queryKey: ["users"],
        queryFn: () => api.fetchUserList(page),
        staleTime: 5 * 60 * 1000,
    });

    return {
        users: queryList.data,
        pagination: queryList.data?.pagination,
        isLoading: queryList.isLoading,
        isError: queryList.isError,
    };
};