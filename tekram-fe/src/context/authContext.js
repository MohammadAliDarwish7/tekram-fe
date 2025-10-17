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
            console.log(token)
            if (!token) return;

            const res = await axiosInstance.get('/auth/GetCurrentUser');
            console.log("auth",res);

            if (res.status === 200) {
                const decoded = jwtDecode(token);
                console.log(decoded)
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
        setIsLogged(false);
        localStorage.clear();
        window.location.href = "/";
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
