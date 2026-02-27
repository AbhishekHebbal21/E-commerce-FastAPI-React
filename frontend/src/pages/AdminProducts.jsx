
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";
import { getProducts } from "../api";

export default function AdminProducts() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  if (!user || user.role !== "admin") return <Navigate to="/" />;

  // Dummy submit handler (replace with actual API call if needed)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.stock) {
      setError("Name, Price, and Stock are required.");
      setSuccess("");
      return;
    }
    setError("");
    setSuccess("Product created!");
    setTimeout(() => setSuccess(""), 1200);
    // Reset form
    setForm({ name: "", description: "", price: "", stock: "" });
  };

  // Fetch products with filters
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        if (minPrice) params.min_price = minPrice;
        if (maxPrice) params.max_price = maxPrice;
        const res = await getProducts({ params });
        setProducts(res.data);
      } catch (err) {
        setProducts([]);
      }
    };
    fetchProducts();
  }, [search, minPrice, maxPrice]);

  return (
    <div className="container">
      <div className="heading">Product Filters</div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <input
          className="form-input"
          type="text"
          placeholder="Search by name"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <input
          className="form-input"
          type="number"
          min="0"
          placeholder="Min price"
          value={minPrice}
          onChange={e => setMinPrice(e.target.value)}
        />
        <input
          className="form-input"
          type="number"
          min="0"
          placeholder="Max price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </div>

      <div className="heading">Create Product</div>
      <form className="form" onSubmit={handleSubmit}>
        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <label className="form-label">Description</label>
        <input
          className="form-input"
          type="text"
          value={form.description}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <label className="form-label">Price</label>
        <input
          className="form-input"
          type="number"
          min="0"
          value={form.price}
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <label className="form-label">Stock</label>
        <input
          className="form-input"
          type="number"
          min="0"
          value={form.stock}
          onChange={e => setForm({ ...form, stock: e.target.value })}
        />
        <button className="button" type="submit">Create</button>
        {error && <div style={{ color: "#d32f2f" }}>{error}</div>}
        {success && <div style={{ color: "#388e3c" }}>{success}</div>}
      </form>

      <div className="heading" style={{ marginTop: 32 }}>Products</div>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <b>{p.name}</b> - ${p.price} ({p.stock} in stock)
          </li>
        ))}
      </ul>
    </div>
  );
}
