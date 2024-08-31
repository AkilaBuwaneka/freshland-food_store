import axios from "axios";

const API_BASE_URL = process.env.BFF_URL;

export const getCartsByUserId = async (userId, page = 0, size = 3) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/carts/user/${userId}`, {
      params: { page, size },
    });
    //console.log("Cart Items:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching carts:", error);
    throw new Error("Error fetching carts");
  }
};

export const getCartById = async (cartId) => {
  const response = await axios.get(`${API_BASE_URL}/carts/${cartId}`);
  return response.data;
};

export const createCart = async (cart) => {
  const response = await axios.post(`${API_BASE_URL}/carts`, cart);
  return response.data;
};

export const deleteCart = async (cartId) => {
  await axios.delete(`${API_BASE_URL}/carts/${cartId}`);
};

export const updateCart = async (cartId, cart) => {
  const response = await axios.put(`${API_BASE_URL}/carts/${cartId}`, cart);
  return response.data;
};
