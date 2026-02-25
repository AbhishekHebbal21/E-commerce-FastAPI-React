import axios from "axios";

const API_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export const register = (data) => api.post("/users/register", data);

export const login = (data) =>
  api.post(
    "/users/token",
    new URLSearchParams({
      username: data.email,
      password: data.password,
    }),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
  );

export const getProducts = () => api.get("/products");
export const createProduct = (data) => api.post("/products", data);

export const getCart = () => api.get("/cart");
export const addToCart = (data) => api.post("/cart/add", data);
export const updateCartItem = (itemId, data) => api.put(`/cart/update/${itemId}`, data);
export const removeCartItem = (itemId) => api.delete(`/cart/remove/${itemId}`);

export const placeOrder = () => api.post("/orders");
export const getOrders = () => api.get("/orders");

export default api;
