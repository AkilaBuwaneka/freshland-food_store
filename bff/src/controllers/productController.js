// const productService = require("../services/productService");

// const getProducts = async (req, res) => {
//   try {
//     const products = await productService.getProducts();
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const { productId } = req.params;
//     const product = await productService.getProductById(productId);
//     res.json(product);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching product", error });
//   }
// };

// const createProduct = async (req, res) => {
//   try {
//     const { file, product } = req.body;
//     const newProduct = await productService.createProduct(file, product);
//     res.json(newProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Error creating product", error });
//   }
// };

// const getProductsByCategoryId = async (req, res) => {
//   try {
//     const { categoryId } = req.params;
//     const products = await productService.getProductsByCategoryId(categoryId);
//     res.json(products);
//   } catch (error) {
//     console.error("Error fetching products by category:", error);
//     res.status(500).json({
//       message: "Error fetching products by category",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   getProducts,
//   getProductById,
//   createProduct,
//   getProductsByCategoryId,
// };

const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const {
      categoryId,
      sortBy,
      minPrice,
      maxPrice,
      search,
      page = 0,
      size = 4,
    } = req.query;
    const products = await productService.getProducts(
      categoryId,
      sortBy,
      minPrice,
      maxPrice,
      search,
      page,
      size
    );
    // console.log(products);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.query;
    const product = await productService.getProductById(productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching product", error });
  }
};

const createProduct = async (req, res) => {
  try {
    const { file } = req.files;
    const product = req.body.product;
    const newProduct = await productService.createProduct(file, product);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: "Error creating product", error });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};
