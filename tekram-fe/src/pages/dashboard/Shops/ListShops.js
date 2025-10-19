import { Container } from "react-bootstrap";
import { axiosInstance, imageUrl } from "../../../hooks/axiosInstance";
import CustomDataTable from "../../../components/CustomDataTable";
import { Link } from "react-router-dom"
import { FaEye } from "react-icons/fa";
const ListShops = () => {
    // Define columns for the table
    const columns = [
        { name: '', selector: row => <img src={imageUrl + row.imageUrl} style={{ width: "80px" }} />, width: "110px" },
        { name: 'Shop Name', selector: row => row.name, sortable: true },
        { name: 'Status', selector: row => row.isOpen == true ? "Open" : "Closed", sortable: true },
        { name: 'Currency', selector: row => row.currency },
        {name: 'Options', selector: row => <Link to={'/shops/' + row.id} className="btn btn-sm btn-icons"><FaEye/></Link>}
    ];

    const fetchShops = async (page, pageSize) => {
        try {
            const response = await axiosInstance.get('/shops', {
                params: { page, pageSize }
            });

            return {
                data: response.data,
                total: response.data.length
            };
        } catch (error) {
            console.error("Error fetching users:", error);
            return { data: [], total: 0 };
        }
    };


    return (
        <>
            <Container className="mt-4">
                <div className="row">
                    <div className="col-8">
                        <h2>Shops</h2>
                    </div>
                    <div className="col">
                        <Link to={"/shops/0"} className="btn btn-success">Add Shop</Link>
                    </div>
                </div>
                <CustomDataTable columns={columns} fetchData={fetchShops} pageSize={10} />
            </Container>
        </>
    );
}

export default ListShops;