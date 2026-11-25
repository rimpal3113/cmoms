
import axios from "axios";

// Backend API Base URL
const API = axios.create({
  baseURL: `http://${window.location.hostname}:5000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// MENU APIs

// Get All Menu Items
export const getMenus = async () => {
  const response = await API.get("/menu");
  return response.data;
};

// Add Menu Item
export const addMenu = async (menuData) => {
  const response = await API.post("/menu", menuData);
  return response.data;
};

// Update Menu Item
export const updateMenu = async (id, menuData) => {
  const response = await API.put(`/menu/${id}`, menuData);
  return response.data;
};

// Delete Menu Item
export const deleteMenu = async (id) => {
  const response = await API.delete(`/menu/${id}`);
  return response.data;
};


// ORDER APIs

// Place Order
export const placeOrder = async (orderData) => {
  const response = await API.post("/orders", orderData);
  return response.data;
};

// Get All Orders
export const getOrders = async () => {
  const response = await API.get("/orders");
  return response.data;
};

// Get Single Order
export const getOrderById = async (id) => {
  const response = await API.get(`/orders/${id}`);
  return response.data;
};

// Update Order Status
export const updateOrderStatus = async (id, status) => {
  const response = await API.patch(`/orders/${id}/status`, {
    status,
  });
  return response.data;
};

export default API;
