import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

export const updateEmployee = async (data: FormData, id: string) => {
    return await defaultAPI.patch(`${BASE_URL}${API_ENDPOINTS.EMPLOYEES}/${id}`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};