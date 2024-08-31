const cartService = require("../services/cartService");

const getCartsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const { page = 0, size = 3 } = req.query;
    const carts = await cartService.getCartsByUserId(userId, page, size);
    res.json(carts);
  } catch (error) {
    console.error("Error fetching carts:", error);
    res.status(500).json({ message: "Error fetching carts", error });
  }
};

const getCartByCartId = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cart = await cartService.getCartByCartId(cartId);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

const createCart = async (req, res) => {
  try {
    const cartDto = req.body;
    const newCart = await cartService.createCart(cartDto);
    res.json(newCart);
  } catch (error) {
    res.status(500).json({ message: "Error creating cart", error });
  }
};

const deleteCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    await cartService.deleteCart(cartId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error deleting cart", error });
  }
};

const updateCart = async (req, res) => {
  try {
    const { cartId } = req.params;
    const cartDto = req.body;
    const updatedCart = await cartService.updateCart(cartId, cartDto);
    res.json(updatedCart);
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

module.exports = {
  getCartsByUserId,
  getCartByCartId,
  createCart,
  deleteCart,
  updateCart,
};
