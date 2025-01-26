import apiClient from './apiClient';

export const updateMarketFromAdmin = async (token, data) => {
  try {
    const response = await apiClient.post(
      "/api/markets/over_ride", 
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      }
    );
    console.log("Update Market:", response.data);
    return response.data;
  } catch (error) {
    console.error("Update Market:", error.response?.data || error.message);
    throw error;
  }
};