import React, { useState, useEffect } from "react";
import { getOrders } from "../api";
export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

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


  return (
    <div className="container">
      <div className="heading">Orders</div>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Total Amount</th>
             </tr>
          </thead>
 
          
          <tbody>
  {orders.map((order) => (
    <tr key={order.id}>
      <td>{order.id}</td>

      <td>
        {order.items.map((item) => (
          <div key={item.id}>
            {item.product.name} (x{item.quantity})
          </div>
        ))}
      </td>

      <td>${order.total_amount}</td>
    </tr>
  ))}
</tbody>
        </table>
      )}
    </div>
  );
}
