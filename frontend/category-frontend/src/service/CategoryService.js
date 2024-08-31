import axios from "axios";

// Define the base URL for the BFF layer
const API_BASE_URL = process.env.BFF_CATEGORY_URL;

// Service to add a new category
const addCategory = async (file, categoryDTO) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("category", JSON.stringify(categoryDTO));

    const response = await axios.post(`${API_BASE_URL}/addCategory`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding category:", error);
    throw error;
  }
};

// Service to fetch all categories
const getAllCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

// Service to fetch a category by ID
const getCategoryById = async (categoryId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};

// Export the category service methods
export default {
  addCategory,
  getAllCategories,
  getCategoryById,
};
