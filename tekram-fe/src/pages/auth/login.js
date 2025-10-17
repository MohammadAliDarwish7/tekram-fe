import { useEffect, useState } from "react";
import { login } from "../../api/authApi";
import logo from "../../images/logo.png"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
const Login = () => {

    const { setIsLogged, setAccessToken, getCurrentUser } = useAuth();
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                await getCurrentUser();
            } catch (error) {
                // Handle error (e.g., user not authenticated)
                navigate('/login');  // Redirect to login page
            }
        };
        fetchCurrentUser();
    }, [])

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            var token = await login(credentials.username, credentials.password);
            if (token != null) {
                setIsLogged(true);
                localStorage.setItem("token", token.token);
                setAccessToken(token.token);
                navigate("/")
            }
        } catch (err) {
            console.error("Login failed:", err);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo">
                    <img src={logo} alt="Logo" />
                </div>

                <h2>Welcome Back</h2>
                <p className="login-subtitle">Please sign in to your account</p>

                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={credentials.username}
                        onChange={(e) =>
                            setCredentials({ ...credentials, username: e.target.value })
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                            setCredentials({ ...credentials, password: e.target.value })
                        }
                        required
                    />

                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
