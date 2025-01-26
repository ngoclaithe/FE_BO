import apiClient from './apiClient';

export const createMoneys = async (data) => {
    try {
        const response = await apiClient.post("/api/moneys/", data); 
        return response.data;
    } catch (error) {
        console.error("Create Moneys Error:", error.response?.data || error.message);
        throw error;
    }
};
export const getMoneysByUserId = async (userId) => {
    try {
        const response = await apiClient.get(`/api/moneys/user/${userId}`); 
        return response.data;
    } catch (error) {
        console.error("Get Moneys by UserId Error:", error.response?.data || error.message);
        throw error;
    }
};