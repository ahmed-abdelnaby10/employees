import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

export const addEmployee = async (data: FormData) => {
    return await defaultAPI.post(`${BASE_URL}${API_ENDPOINTS.EMPLOYEES}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};