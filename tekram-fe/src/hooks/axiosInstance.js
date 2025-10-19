import axios from 'axios';
const API_URL = "http://192.168.0.103:8080/api";
const API_Auth_URL = "http://192.168.0.103:8080/api";
const Image_URL = "http://192.168.0.103:8080";

export const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const imageUrl = Image_URL;

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
