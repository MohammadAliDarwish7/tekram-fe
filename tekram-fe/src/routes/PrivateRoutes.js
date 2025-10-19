import { Route, Routes } from "react-router-dom";
import Home from "../pages/dashboard/home";
import ListShops from "../pages/dashboard/Shops/ListShops";
import ManageShops from "../pages/dashboard/Shops/ManageShops";
import ListCustomers from "../pages/dashboard/Customers/ListCustomers";
import ManageCustomers from "../pages/dashboard/Customers/ManageCustomers";

const PrivateRoutes = () => {
    return (
        <>
            <Routes>
                <Route path="*" element={<Home />} />
                <Route path="/" element={<Home />} />

                <Route path="/customers" element={<ListCustomers />} />
                <Route path="/customers/:customerId" element={<ManageCustomers />} />

                <Route path="/shops" element={<ListShops />} />
                <Route path="/shops/:shopId" element={<ManageShops />} />
            </Routes>
        </>
    )

}
export default PrivateRoutes;