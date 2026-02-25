import React, { useState, useEffect } from "react";
import { getProducts, addToCart } from "../api";
export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(null);

  useEffect(() => {
    getProducts()
      .then((res) => setProducts(res.data))
      .catch(() => setError("Failed to load products"))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = async (productId) => {
    try {
      await addToCart({ product_id: productId, quantity: 1 });
      setAdded(productId);
      setTimeout(() => setAdded(null), 1000);
    } catch {
      setError("Add to cart failed");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="heading">Products</div>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.description}</td>
              <td>${p.price}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="button"
                  onClick={() => handleAdd(p.id)}
                  disabled={added === p.id}
                >
                  {added === p.id ? "Added!" : "Add to Cart"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
