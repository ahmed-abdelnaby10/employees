import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

const buildQueryString = (params: EmployeeQueryParams): string => {
    const queryParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
            queryParams.append(key, value.toString());
        }
    });

    return queryParams.toString();
};

export const getAllEmployees = async (queryParams: EmployeeQueryParams = {}) => {
    
    const queryString = buildQueryString(queryParams);

    return await defaultAPI.get(`${BASE_URL}${API_ENDPOINTS.EMPLOYEES}?${queryString}`)
}

export const getEmployeeById= async (id: string) => {
    return await defaultAPI.get(`${BASE_URL}${API_ENDPOINTS.EMPLOYEES}?id=${id}`)
}