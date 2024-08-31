const axios = require("axios");
const FormData = require("form-data");
const config = require("../config/config");

const API_BASE_URL = config.API_BASE_URL_CATEGORY;

const getCategories = async () => {
  const response = await axios.get(`${API_BASE_URL}`);
  return response.data;
};

const getCategoryById = async (categoryId) => {
  const response = await axios.get(`${API_BASE_URL}/getCategoryById`, {
    params: { categoryId },
  });
  return response.data;
};

const createCategory = async (file, category) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("category", category);

  const response = await axios.post(`${API_BASE_URL}/addCategory`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
};
