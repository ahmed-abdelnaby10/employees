import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

export const loginAuth = async (data: LoginValues) => {
    return await defaultAPI.post(`${BASE_URL}${API_ENDPOINTS.SIGNIN}`, data)
}