const express = require("express");
const orderController = require("../controllers/orderController");

const router = express.Router();

// Define the routes for order operations
router.post("/generate-hash", orderController.generateHash);
router.post("/save-order", orderController.saveOrder);
router.get("/getOrdersByUserId", orderController.getOrdersByUserId);
router.get("/getOrderById", orderController.getOrderById);

module.exports = router;
