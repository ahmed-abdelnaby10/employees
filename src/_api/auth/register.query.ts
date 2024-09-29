import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

export const registerAuth = async (data: RegisterValues) => {
    return await defaultAPI.post(`${BASE_URL}${API_ENDPOINTS.SIGNUP}`, data)
}