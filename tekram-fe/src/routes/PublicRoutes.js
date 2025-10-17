import { Route, Routes } from "react-router-dom";
import Login from '../pages/auth/login'

const PublicRoutes = ({ setUser, setIsLogged, setAccessToken}) => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Login setUser={setUser} setIsLogged={setIsLogged} setAccessToken={setAccessToken} />} />
                <Route path="/login" element={<Login setUser={setUser} setIsLogged={setIsLogged} setAccessToken={setAccessToken} />} />
            </Routes>
        </>
    )

}
export default PublicRoutes;