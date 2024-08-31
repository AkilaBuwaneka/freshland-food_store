import axios from "axios";

const API_BASE_URL = process.env.BFF_URL;
const getAllProducts = async (filters) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: filters,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

const getProductById = async (productId) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/products/getProductById`,
      {
        params: { productId },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
};

const createProduct = async (file, product) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("product", JSON.stringify(product));

    const response = await axios.post(
      `${API_BASE_URL}/products/addProduct`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

const getProductsByCategoryId = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: { categoryId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching products by category:", error);
    throw error;
  }
};

export default {
  getAllProducts,
  getProductById,
  createProduct,
  getProductsByCategoryId,
};
