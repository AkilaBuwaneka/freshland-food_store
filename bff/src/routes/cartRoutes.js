const express = require("express");
const cartController = require("../controllers/cartController");

const router = express.Router();

router.get("/user/:userId", cartController.getCartsByUserId);
router.get("/:cartId", cartController.getCartByCartId);
router.post("/", cartController.createCart);
router.delete("/:cartId", cartController.deleteCart);
router.put("/:cartId", cartController.updateCart);

module.exports = router;
