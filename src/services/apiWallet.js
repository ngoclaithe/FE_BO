import apiClient from './apiClient';


export const getCurrentWallet = async (token) => {
    try {
        const response = await apiClient.get("/api/wallets/me", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Get wallet Error:", error.response?.data || error.message);
        throw error;
    }
};
