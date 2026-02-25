import React, { useState, useEffect } from "react";
import { getOrders, placeOrder } from "../api";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [placed, setPlaced] = useState(false);

  const fetchOrders = () => {
    setLoading(true);
    getOrders()
      .then((res) => setOrders(res.data))
      .catch(() => setError("Failed to load orders"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      setPlaced(true);
      fetchOrders();
    } catch {
      setError("Order failed");
    }
  };

  return (
    <div className="container">
      <div className="heading">Orders</div>
      <button
        className="button"
        onClick={handlePlaceOrder}
        disabled={placed}
        style={{ marginBottom: 18 }}
      >
        {placed ? "Order Placed!" : "Place Order"}
      </button>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Amount</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.total_amount}</td>
                <td>{order.date ? new Date(order.date).toLocaleString() : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
