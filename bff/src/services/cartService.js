const axios = require("axios");
const config = require("../config/config");

const API_BASE_URL = config.API_BASE_URL_CART;

const getCartsByUserId = async (userId, page, size) => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`, {
    params: { page, size },
  });
  return response.data;
};

const getCartByCartId = async (cartId) => {
  const response = await axios.get(`${API_BASE_URL}/${cartId}`);
  return response.data;
};

const createCart = async (cartDto) => {
  const response = await axios.post(`${API_BASE_URL}`, cartDto);
  return response.data;
};

const deleteCart = async (cartId) => {
  await axios.delete(`${API_BASE_URL}/${cartId}`);
};

const updateCart = async (cartId, cartDto) => {
  const response = await axios.put(`${API_BASE_URL}/${cartId}`, cartDto);
  return response.data;
};

module.exports = {
  getCartsByUserId,
  getCartByCartId,
  createCart,
  deleteCart,
  updateCart,
};
