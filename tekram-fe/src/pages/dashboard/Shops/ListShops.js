import { Container } from "react-bootstrap";
import { axiosInstance } from "../../../hooks/axiosInstance";
import CustomDataTable from "../../../components/CustomDataTable";

const ListShops = () => {
    // Define columns for the table
    const columns = [
        { name: 'ID', selector: row => row.id, sortable: true },
        { name: 'Name', selector: row => row.name, sortable: true },
        { name: 'Email', selector: row => row.email },
    ];

    const fetchUsers = async (page, pageSize) => {
        try {
            const response = await axiosInstance.get('/shops', {
                params: { page, pageSize }
            });

            return {
                data: response.data.items, // your API should return { items: [], total: number }
                total: response.data.total
            };
        } catch (error) {
            console.error("Error fetching users:", error);
            return { data: [], total: 0 };
        }
    };


    return ( 
        <>
            <Container className="mt-4">
                <h2>Shops</h2>
                <CustomDataTable columns={columns} fetchData={fetchUsers} pageSize={10} />
            </Container>
        </>
     );
}
 
export default ListShops;