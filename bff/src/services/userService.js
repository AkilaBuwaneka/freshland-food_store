const axios = require("axios");
const config = require("../config/config");

const API_BASE_URL = config.API_BASE_URL_USER;

const addUser = async (userData) => {
  const response = await axios.post(`${API_BASE_URL}`, userData);
  return response.data;
};

const getUserByEmail = async (email) => {
  const response = await axios.get(`${API_BASE_URL}/${email}`);
  return response.data;
};

module.exports = {
  addUser,
  getUserByEmail,
};
