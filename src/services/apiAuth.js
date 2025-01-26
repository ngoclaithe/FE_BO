import apiClient from './apiClient';

export const registerUser = async (email, password, username, phone, phonezalo) => {
    try {
        const response = await apiClient.post("/api/auth/register", {
            email,
            password,
            username,
            phone,
            phonezalo,
        });
        console.log("Register Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Register Error:", error.response?.data || error.message);
        throw error;
    }
};

export const loginUser = async (email, password) => {
    try {
        const data = {
            email: email,
            password: password,
        };

        const response = await apiClient.post("/api/auth/login", data, {
            // headers: {
            //     "Content-Type": "application/json",
            // },
        });
        console.log("Login Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Login Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getUserInfo = async (accessToken) => {
    try {
        const response = await apiClient.get("/auth/me", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("User Info Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get User Info Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getAllUsers = async (accessToken) => {
    try {
        const response = await apiClient.get("/auth/users", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        console.log("All Users Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get All Users Error:", error.response?.data || error.message);
        throw error;
    }
};
export const updateRoleUser = async (accessToken, user_id, role) => { 
    try {
        const response = await apiClient.put(
            `/users/${user_id}`, 
            { role }, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Update Role Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Update Role Error:", error.response?.data || error.message);
        throw error;
    }
};
export const deleteUser = async (accessToken, user_id) => { 
    try {
        const response = await apiClient.delete(
            `/auth/${user_id}`, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("Delete User Response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Delete User Error:", error.response?.data || error.message);
        throw error;
    }
};
export const logOut = async (accessToken) => { 
    try {
        if (!accessToken) {
            throw new Error("No access token provided");
        }

        const response = await apiClient.post(
            `/api/auth/logout`, 
            null, 
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, 
                },
            }
        );

        if (response.status === 200) {
            console.log("Logout successful:", response.data);
            return response.data; 
        } else {
            throw new Error(`Unexpected response status: ${response.status}`);
        }
    } catch (error) {
        console.error("Logout Error:", error.response?.data || error.message);
        throw error; 
    }
};
