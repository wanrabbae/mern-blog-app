const CategoryModel = require("../models/Category");

const createCategory = async (req, res) => {
  const { name } = req.body;
  const category = new CategoryModel({
    name: name.toLowerCase(),
  });
  await category.save();
  res.status(200).json({
    status: "success",
    message: "Category berhasil dibuat!",
    data: category,
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  await CategoryModel.findByIdAndDelete(id);
  res.status(200).json({
    status: "success",
    message: "Category berhasil dihapus!",
  });
};

const getCategory = async (req, res) => {
  const category = await CategoryModel.find();
  res.status(200).json({
    status: "success",
    data: category,
  });
};

module.exports = {
  createCategory,
  deleteCategory,
  getCategory,
};
