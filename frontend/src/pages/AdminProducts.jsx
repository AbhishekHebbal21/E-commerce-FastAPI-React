
import React, { useState } from "react";
import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";

export default function AdminProducts() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: "", description: "", price: "", stock: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  return (
    <div className="container">
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
    </div>
  );
}
