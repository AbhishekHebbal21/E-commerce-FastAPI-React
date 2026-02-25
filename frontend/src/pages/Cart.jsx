import React, { useState, useEffect } from "react";
import { getCart, updateCartItem, removeCartItem } from "../api";
export default function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [quantities, setQuantities] = useState({});
  const [updating, setUpdating] = useState(null);

  const fetchCart = () => {
    setLoading(true);
    getCart()
      .then((res) => {
        setCart(res.data.items || []);
        // Set initial quantities
        const q = {};
        (res.data.items || []).forEach(item => { q[item.id] = item.quantity; });
        setQuantities(q);
      })
      .catch(() => setError("Failed to load cart"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdate = async (itemId) => {
    setUpdating(itemId);
    try {
      await updateCartItem(itemId, { quantity: quantities[itemId] });
      fetchCart();
    } catch {
      setError("Update failed");
    } finally {
      setUpdating(null);
    }
  };

  const handleRemove = async (itemId) => {
    setUpdating(itemId);
    try {
      await removeCartItem(itemId);
      fetchCart();
    } catch {
      setError("Remove failed");
    } finally {
      setUpdating(null);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container">
      <div className="heading">Cart</div>
      {cart.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>${item.product.price}</td>
                <td>
                  <input
                    className="input"
                    type="number"
                    min={1}
                    value={quantities[item.id] || item.quantity}
                    onChange={e => setQuantities({ ...quantities, [item.id]: Number(e.target.value) })}
                  />
                </td>
                <td>${(item.product.price * (quantities[item.id] || item.quantity)).toFixed(2)}</td>
                <td>
                  <button
                    className="button"
                    onClick={() => handleUpdate(item.id)}
                    disabled={updating === item.id}
                  >
                    Update
                  </button>
                  <button
                    className="button"
                    style={{ background: "#d32f2f" }}
                    onClick={() => handleRemove(item.id)}
                    disabled={updating === item.id}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="total">Total Amount: ${total.toFixed(2)}</div>
    </div>
  );
}