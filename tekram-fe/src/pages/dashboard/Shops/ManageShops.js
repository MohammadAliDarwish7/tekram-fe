import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { axiosInstance, imageUrl } from "../../../hooks/axiosInstance";
import { toast } from "react-toastify";
import ManageProducts from "../Products/ManageProducts";

const ManageShops = () => {
    const pId = useParams()
    const [title, setTitle] = useState("");
    const [name, setName] = useState("");
    const [isOpen, setIsOpen] = useState(true);
    const [currency, setCurrency] = useState("USD");
    const [image, setImage] = useState(null);
    useEffect(() => {
        if (pId.shopId == 0) {
            setTitle("Add Shop")
        } else {
            setTitle("Edit Shop")
            fetchShop(pId.shopId)
        }
    }, [])
    const fetchShop = async (shopId) => {
        const response = await axiosInstance.get("/shops/" + shopId)
        console.log(response)
        if(response.status == 200){
            setName(response.data.name);
            setImage(imageUrl + response.data.imageUrl)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("Name", name);
            formData.append("IsOpen", isOpen);
            formData.append("Currency", currency);
            if (image) formData.append("Image", image);

            const response = await axiosInstance.post("/shops", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Shop created successfully!");
        } catch (error) {
            toast.error("Error creating shop!");
        }
    };
    return (
        <>
            <Container>

                <div className="row">
                    <div className="col-8">
                        <h2>{title}</h2>

                    </div>
                    {pId.shopId == 0 ? (
                        <form onSubmit={handleSubmit} className="p-4 border rounded">
                            <div>
                                <label>Shop Name:</label>
                                <input
                                    type="text"
                                    value={name}
                                    className="form-control"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label>Currency:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={isOpen}
                                        onChange={(e) => setIsOpen(e.target.checked)}
                                    />
                                    Is Open
                                </label>
                            </div>

                            <div>
                                <label>Upload Image:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />
                            </div>

                            <button type="submit" className="btn btn-success">Create Shop</button>
                        </form>
                    ) : (
                        <div className="row">
                            
                                <div className="col-md-2">
                                    <img src={image} style={{width:"100%"}}/>
                                    </div>
                                    <div className="col-md-8">
                                <p>Shope Name: {name}</p>
                                
                                </div>
                            <ManageProducts shopId={pId.shopId} />
                        </div>
                    )}

                </div>
                <div className="row">

                </div>
            </Container>
        </>
    );
}

export default ManageShops;