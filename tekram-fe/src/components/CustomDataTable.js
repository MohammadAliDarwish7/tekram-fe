import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import DataTable from "react-data-table-component"
const CustomDataTable = ({ columns, fetchData, pageSize = 10 }) => {
    const [data, setData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const loadData = async (page) => {
        setLoading(true);
        try {
            const response = await fetchData(page, pageSize);
            setData(response.data);
            setTotalRows(response.total);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    useEffect(() => {
        loadData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        await loadData(page);
    };

    return (
        <DataTable
            columns={columns}
            data={data}
            progressPending={loading}
            pagination
            paginationServer
            paginationTotalRows={totalRows}
            paginationDefaultPage={currentPage}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handlePerRowsChange}
            progressComponent={<Spinner animation="border" />}
        />
    );
};

export default CustomDataTable;