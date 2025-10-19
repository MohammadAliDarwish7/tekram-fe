import { Link } from "react-router-dom";
import CustomDataTable from "../../../components/CustomDataTable";
import { useEffect } from "react";
import { axiosInstance } from "../../../hooks/axiosInstance";

const ListCustomers = () => {

    const fetchCustomers = async (page, pageSize) => {
        try {
            const response = await axiosInstance.get('/customers', {
                params: { page, pageSize }
            });

console.log(response)

            return {
                data: response.data, // your API should return { items: [], total: number }
                total: response.data.length
            };
        } catch (error) {
            console.error("Error fetching users:", error);
            return { data: [], total: 0 };
        }
    }
    const columns = [
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Username', selector: row => row.username, sortable: true },
        { name: 'Email', selector: row => row.email },
        { name: 'Date Created', selector: row => row.createdAt },
        { name: 'Status', selector: row => row.isActive == false ? "Not Active" : "Active" },
    ];

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">List Customers</h3>
                                <div className="self-content-center">
                                    <Link to={"/customers/0"} className="btn btn-sm btn-success">Add Customer</Link>
                                </div>
                            </div>
                            <div className="card-body">
                                <CustomDataTable columns={columns} fetchData={fetchCustomers} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ListCustomers;