import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/auth';

// Register new user
export const registerUser = async ({ username, email, password }) => {
    const res = await axios.post(`${API_BASE_URL}/register`, {
        username,
        email,
        password,
    });
    return res.data;
};

// Login existing user
export const loginUser = async ({ email, password }) => {
    const res = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
    });
    return res.data;
};

// Logout user
export const logoutUser = async () => {
    const res = await axios.post(`${API_BASE_URL}/logout`);
    return res.data;
};