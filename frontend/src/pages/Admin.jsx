import React, { useState } from "react";
import { createProduct } from "../api";

export default function Admin() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ name, description, price: Number(price), stock: Number(stock) });
      setMsg("Product created");
      setName(""); setDescription(""); setPrice(""); setStock("");
    } catch {
      setMsg("Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "40px auto" }}>
      <h2>Create Product</h2>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ width: "100%", marginBottom: 8 }} />
      <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required style={{ width: "100%", marginBottom: 8 }} />
      <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required style={{ width: "100%", marginBottom: 8 }} />
      <input type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required style={{ width: "100%", marginBottom: 8 }} />
      <button type="submit" style={{ width: "100%" }}>Create</button>
      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
    </form>
  );
}
