const categoryService = require("../services/categoryService");

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryService.getCategoryById(categoryId);
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category", error });
  }
};

const createCategory = async (req, res) => {
  try {
    const { file, category } = req.body;
    const newCategory = await categoryService.createCategory(file, category);
    res.json(newCategory);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
};
