import axios from "axios";

// Define the base URL for the BFF layer
const API_BASE_URL = process.env.API_BASE_URL;

// Service to add a new user
const addUser = async (userDTO) => {
  try {
    const response = await axios.post(`${API_BASE_URL}`, userDTO);
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
};

// Service to fetch a user by email
const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Export the user service methods
export default {
  addUser,
  getUserByEmail,
};
