import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

const buildQueryString = (params: UsersQueryParams): string => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
        }
    });

    return queryParams.toString();
};

export const getAllUsers = async (queryParams: UsersQueryParams = {}) => {
    
    const queryString = buildQueryString(queryParams);

    return await defaultAPI.get(`${BASE_URL}${API_ENDPOINTS.USERS}?${queryString}`)
}