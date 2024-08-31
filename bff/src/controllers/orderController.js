const orderService = require("../services/orderService");

const generateHash = async (req, res) => {
  try {
    const hashRequestDTO = req.body;
    const result = await orderService.generateHash(hashRequestDTO);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Error generating hash", error });
  }
};

const saveOrder = async (req, res) => {
  try {
    const orderRequestDTO = req.body;
    const savedOrder = await orderService.saveOrder(orderRequestDTO);
    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error saving order", error });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.query;
    const orders = await orderService.getOrdersByUserId(userId);
    if (orders) {
      res.json(orders);
    } else {
      res.status(404).json({ message: "Orders not found for the user" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.query;
    const order = await orderService.getOrderById(orderId);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};

module.exports = {
  generateHash,
  saveOrder,
  getOrdersByUserId,
  getOrderById,
};
