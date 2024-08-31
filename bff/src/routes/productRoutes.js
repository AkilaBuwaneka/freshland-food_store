// const express = require("express");
// const productController = require("../controllers/productController");

// const router = express.Router();

// router.get("/", productController.getProducts);
// router.get("/:productId", productController.getProductById);
// router.post("/", productController.createProduct);
// router.get("/category/:categoryId", productController.getProductsByCategoryId);

// module.exports = router;

const express = require("express");
const productController = require("../controllers/productController");

const router = express.Router();

// Update to match the new endpoint structure
router.get("/", productController.getProducts);
router.get("/getProductById", productController.getProductById);
router.post("/addProduct", productController.createProduct);

module.exports = router;
