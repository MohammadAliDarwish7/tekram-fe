import { Nav } from "react-bootstrap";
import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import logo from "../../images/logo.png"
import { useAuth } from "../../context/authContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const {logout } = useAuth()
    return (
        <div className="sidebar d-flex flex-column p-3">
            <div className="sidebar-header text-center mb-4">
                <img
                    src={logo}
                    alt="Company Logo"
                    className="sidebar-logo mb-2"
                />
                <h5 className="text-white fw-bold">MyCompany</h5>
            </div>

            <Nav className="flex-column">
                <Nav.Link as={NavLink} to="/Customers" className="text-white d-flex align-items-center">
                    <FaHome className="me-2" /> Customers
                </Nav.Link>
                <Nav.Link as={NavLink} to="/Shops" className="text-white d-flex align-items-center">
                    <FaUser className="me-2" /> Shops
                </Nav.Link>
                <Nav.Link as={NavLink} to="/Products" className="text-white d-flex align-items-center">
                    <FaCog className="me-2" /> Products
                </Nav.Link>
                <Nav.Link as={NavLink} to="/Orders" className="text-white d-flex align-items-center">
                    <FaCog className="me-2" /> Orders
                </Nav.Link>
            </Nav>

            <div className="mt-auto">
                <Nav.Link onClick={logout} className="text-white d-flex align-items-center">
                    <FaSignOutAlt className="me-2" /> Logout
                </Nav.Link>
            </div>
        </div>
    );
};

export default Sidebar;
