import axios from 'axios';
const API_URL = "https://localhost:7155/";
const API_Auth_URL = "https://localhost:7155/api";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

export const axiosAuthInstance = axios.create({
    baseURL: API_Auth_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
