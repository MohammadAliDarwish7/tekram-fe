import { Route, Routes } from "react-router-dom";
import Login from '../pages/auth/login'
import Home from "../pages/dashboard/home";

const PrivateRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Home/>} />
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    )

}
export default PrivateRoutes;