import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const CustomDataTable = ({ columns, fetchData }) => {
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const loadData = async () => {
    if (!fetchData) {
      console.error("❌ fetchData prop is missing in CustomDataTable!");
      return;
    }

    
    setLoading(true);
    const result = await fetchData(page, pageSize);
    console.log(result)
    setData(result.data);
    setTotalRows(result.total);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [page, pageSize]);

  return (
    <DataTable
      columns={columns}
      data={data}
      progressPending={loading}
      pagination
      paginationServer
      paginationTotalRows={totalRows}
      onChangePage={setPage}
      onChangeRowsPerPage={setPageSize}
    />
  );
};

export default CustomDataTable;
