import axios from "axios";

const API_BASE_URL = process.env.BFF_ORDER_URL; // Adjust this base URL as needed

export const generateOrderHash = async (hashRequestDTO) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/generate-hash`,
      hashRequestDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error generating order hash:", error);
    throw new Error("Error generating order hash");
  }
};

export const saveOrder = async (orderRequestDTO) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/save-order`,
      orderRequestDTO
    );
    return response.data;
  } catch (error) {
    console.error("Error saving order:", error);
    throw new Error("Error saving order");
  }
};

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getOrdersByUserId`, {
      params: { userId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    throw new Error("Error fetching orders by user ID");
  }
};

export const getOrderById = async (orderId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/getOrderById`, {
      params: { orderId },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw new Error("Error fetching order by ID");
  }
};
