// const axios = require("axios");
// const FormData = require("form-data");
// const config = require("../config/config");

// const API_BASE_URL = config.API_BASE_URL_PRODUCT;

// const getProducts = async () => {
//   const response = await axios.get(`${API_BASE_URL}`);
//   return response.data;
// };

// const getProductById = async (productId) => {
//   const response = await axios.get(`${API_BASE_URL}/getProductById`, {
//     params: { productId },
//   });
//   return response.data;
// };

// const createProduct = async (file, product) => {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("product", product);

//   const response = await axios.post(`${API_BASE_URL}/addProduct`, formData, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   });
//   return response.data;
// };

// const getProductsByCategoryId = async (categoryId) => {
//   const response = await axios.get(`${API_BASE_URL}/getProductsByCategoryId`, {
//     params: { categoryId },
//   });
//   return response.data;
// };

// module.exports = {
//   getProducts,
//   getProductById,
//   createProduct,
//   getProductsByCategoryId,
// };

const axios = require("axios");
const FormData = require("form-data");
const config = require("../config/config");

const API_BASE_URL = config.API_BASE_URL_PRODUCT;

// const getProducts = async (
//   categoryId,
//   sortBy,
//   minPrice,
//   maxPrice,
//   search,
//   page,
//   size
// ) => {
//   const response = await axios.get(`${API_BASE_URL}`, {
//     params: { categoryId, sortBy, minPrice, maxPrice, search, page, size },
//   });
//   return response.data;
// };

const getProducts = async (
  categoryId,
  sortBy,
  minPrice,
  maxPrice,
  search,
  page,
  size
) => {
  // Create a query object
  const query = {
    categoryId,
    sortBy,
    minPrice,
    maxPrice,
    search,
    page,
    size,
  };

  // Filter out undefined, null, or empty string values
  const filteredQuery = Object.fromEntries(
    Object.entries(query).filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
  );

  // Send request with filtered query parameters
  // console.log(filteredQuery);
  const response = await axios.get(`${API_BASE_URL}`, {
    params: filteredQuery,
  });
  // console.log(response);
  // return response.data;
  return response.data;
};

const getProductById = async (productId) => {
  const response = await axios.get(`${API_BASE_URL}/getProductById`, {
    params: { productId },
  });
  return response.data;
};

const createProduct = async (file, product) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("product", product);

  const response = await axios.post(`${API_BASE_URL}/addProduct`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
