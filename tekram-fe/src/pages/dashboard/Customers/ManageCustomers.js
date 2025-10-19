import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CustomDataTable from "../../../components/CustomDataTable";

const ManageCustomers = () => {
    const pId = useParams();
    const [title, setTitle] = useState("")
    useEffect(() => {
        if (pId.customerId == 0) {
            setTitle("Add Customer")
        }
        else {
            setTitle("Edit Customer")
        }
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h3 className="card-title">{title}</h3>
                            </div>
                            <div className="card-body">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ManageCustomers;