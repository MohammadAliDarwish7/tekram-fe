import React, { useState } from "react";
import { axiosInstance, imageUrl } from "../../../hooks/axiosInstance";
import CustomDataTable from "../../../components/CustomDataTable";

const ManageProducts = ({shopId}) => {
  const [form, setForm] = useState({
    id: "",
    shopId: shopId,
    name: "",
    price: "",
    availability: true,
    image: null,
  });
  const [editing, setEditing] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm({ ...form, [name]: checked });
    } else if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Create or update product
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("ShopId", shopId);
    formData.append("Name", form.name);
    formData.append("Price", form.price);
    formData.append("Availability", form.availability);
    if (form.image) formData.append("Image", form.image);

    try {
      if (editing) {
        await axiosInstance.put(`/products/${form.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axiosInstance.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setForm({ id: "", shopId: "", name: "", price: "", availability: true, image: null });
      setEditing(false);
      fetchProducts();
    } catch (err) {
      console.error("Error saving product", err);
    }
  };

  // Edit product
  const handleEdit = (product) => {
    setForm({
      id: product.id,
      shopId: shopId,
      name: product.name,
      price: product.price,
      availability: product.availability,
      image: null,
    });
    setEditing(true);
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axiosInstance.delete(`/products/${id}`);
    } catch (err) {
      console.error("Error deleting product", err);
    }
  };

  // Columns for CustomDataTable
  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    { name: "Price", selector: (row) => `$${row.price}`, sortable: true },
    { name: "Availability", selector: (row) => (row.availability ? "Yes" : "No"), sortable: true },
    {
      name: "Image",
      cell: (row) =>
        row.imageUrl ? (
          <img
            src={imageUrl + row.imageUrl}
            alt={row.name}
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        ) : null,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(row)}>
            Edit
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => handleDelete(row.id)}>
            Delete
          </button>
        </>
      ),
    },
  ];

  // fetchData function for CustomDataTable
  const fetchProducts = async (page, pageSize) => {
    try {
      const response = await axiosInstance.get("/products/shop/" + shopId, { params: { page, pageSize } });
      return { data: response.data, total: response.data.length }; // adjust if your API returns total count
    } catch (err) {
      console.error("Error fetching products", err);
      return { data: [], total: 0 };
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">{editing ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="form-control"
              placeholder="Product Name"
              required
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="form-control"
              placeholder="Price"
              required
            />
          </div>
          <div className="col-md-2">
            <input type="file" name="image" onChange={handleChange} className="form-control" />
          </div>
          <div className="col-md-2 d-flex align-items-center">
            <div className="form-check">
              <input
                type="checkbox"
                name="availability"
                checked={form.availability}
                onChange={handleChange}
                className="form-check-input"
                id="availabilityCheck"
              />
              <label className="form-check-label" htmlFor="availabilityCheck">
                Available
              </label>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {editing ? "Update Product" : "Add Product"}
        </button>
        {editing && (
          <button
            type="button"
            className="btn btn-secondary mt-3 ms-2"
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        )}
      </form>

      <h3 className="mb-3">Products List</h3>
      <CustomDataTable fetchData={fetchProducts} columns={columns} />
    </div>
  );
};

export default ManageProducts;
