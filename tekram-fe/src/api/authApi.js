import { axiosAuthInstance } from "../hooks/axiosInstance";


export const login = async (username, password) => {
    const res = await axiosAuthInstance.post('/auth/login', { username, password });
    return res.data;
};


export const checkUser = async () => {
    const res = await axiosAuthInstance.get('/auth/GetCurrentUser');
    return res.data;
};