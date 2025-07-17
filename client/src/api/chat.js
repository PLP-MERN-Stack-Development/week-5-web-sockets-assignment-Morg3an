import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Set auth token in headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

// Get public messages
export const fetchMessages = async () => {
    const res = await axios.get(`${API_BASE_URL}/messages`, getAuthHeaders());
    return res.data;
};

// Get user list
export const fetchUsers = async () => {
    const res = await axios.get(`${API_BASE_URL}/users`, getAuthHeaders());
    return res.data;
};