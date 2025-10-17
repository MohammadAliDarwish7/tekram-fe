import { Route, Routes } from "react-router-dom";
import Login from '../pages/auth/login'
import Home from "../pages/dashboard/home";
import ListShops from "../pages/dashboard/Shops/ListShops";

const PrivateRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Home/>} />
                <Route path="/" element={<Home />} />

                <Route path="/shops" element={<ListShops />} />
            </Routes>
        </>
    )

}
export default PrivateRoutes;