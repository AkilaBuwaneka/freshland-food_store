const axios = require("axios");
const config = require("../config/config");

const API_BASE_URL = config.API_BASE_URL_ORDER;

const generateHash = async (hashRequestDTO) => {
  const response = await axios.post(
    `${API_BASE_URL}/generate-hash`,
    hashRequestDTO
  );
  return response.data;
};

const saveOrder = async (orderRequestDTO) => {
  const response = await axios.post(`${API_BASE_URL}/save`, orderRequestDTO);
  return response.data;
};

const getOrdersByUserId = async (userId) => {
  const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
  return response.data;
};

const getOrderById = async (orderId) => {
  const response = await axios.get(`${API_BASE_URL}/${orderId}`);
  return response.data;
};

module.exports = {
  generateHash,
  saveOrder,
  getOrdersByUserId,
  getOrderById,
};
