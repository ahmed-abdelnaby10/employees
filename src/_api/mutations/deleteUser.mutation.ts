import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

export const deleteUser = async (id: string) => {
    return await defaultAPI.delete(`${BASE_URL}${API_ENDPOINTS.USERS}/${id}`);
};