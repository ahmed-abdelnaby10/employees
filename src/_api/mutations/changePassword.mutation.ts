import { API_ENDPOINTS, BASE_URL } from "@/utils/constants";
import { defaultAPI } from "../axios";

type Data = {
    oldPassword: string,
    newPassword: string,
    c_password: string
}

export const changePassword = async (data: Data, id: string) => {
    return await defaultAPI.patch(`${BASE_URL}${API_ENDPOINTS.USERS}/${id}/change-password`, data);
};