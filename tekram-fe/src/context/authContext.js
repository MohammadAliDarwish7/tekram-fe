import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { jwtDecode } from 'jwt-decode';
import { axiosInstance } from "../hooks/axiosInstance";
const AuthContext = createContext({}); // default empty object

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(localStorage.getItem("token") ?? null);
    const [isLogged, setIsLogged] = useState(false);
    const [userPermissions, setUserPermissions] = useState([])

    // Fetch current user
    const getCurrentUser = useCallback(async () => {
        try {
            let token = localStorage.getItem("token");
            if (!token) {
                return; // failed refresh
            }
            const res = await axiosInstance.get('/auth/GetCurrentUser', {
                headers: {
                    Authorization: `Bearer ${token}`, // overrides interceptor token
                },
            });

            console.log(res);

            if (res.data.statusCode === 200) {
                const decoded = jwtDecode(token);
                setIsLogged(true);
            } else {
                setIsLogged(false);
            }
        } catch (err) {
            console.error("Error fetching user", err);
            await logout();
        }
    }, [accessToken]);

    const logout = () => {

    }

    useEffect(() => {
        getCurrentUser();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                isLogged,
                userPermissions,
                logout,
                setIsLogged,
                setAccessToken,
                getCurrentUser,
                setUserPermissions
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
