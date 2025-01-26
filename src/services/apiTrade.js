import apiClient from './apiClient';

export const getPendingTrades = async (token) => {
    try {
        const response = await apiClient.get("/api/trades/pending/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Get pending trades Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getPendingTradesByPhonezalo = async (phonezalo, token) => {
    try {
        const response = await apiClient.get(`/api/trades/pending/${phonezalo}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Get pending trades by phonezalo Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getGuestTrades = async (token) => {
    try {
        const response = await apiClient.get("/api/trades/alls/", {
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
export const updateTrade = async (tradeId, data, token) => {
    try {
        const response = await apiClient.put(`/api/trades/${tradeId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Update trade Error:", error.response?.data || error.message);
        throw error;
    }
}