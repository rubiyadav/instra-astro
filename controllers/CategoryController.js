const Category = require("../models/Category");
const ObjectId = require("mongodb").ObjectID;

module.exports.addCategory = async (req, res) => {
  const categoryImage = req.file ? req.file.filename : null;
  const { name, top_categories } = req.body;
  try {
    const data = await Category.create({
      name,
      top_categories,
      image: categoryImage,
    });
    res.status(200).json({ msg: "Category successfully added", data });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewCategory = async (req, res) => {
  try {
    const data = await Category.find({});
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.editCategory = async (req, res) => {
  const { name, top_categories, currentImage } = req.body;
  const categoryImage = req.file ? req.file.filename : currentImage;
  try {
    const editBanner = await Category.findByIdAndUpdate(
      {
        _id: ObjectId(req.params.id),
      },
      {
        name,
        top_categories,
        image: categoryImage,
      }
    );
    res.status(200).json({ msg: "Category successfully edited" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteCategory = async (req, res) => {
  try {
    const response = await Category.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewTopCat = async (req, res) => {
  try {
    const viewProduct = await Category.find({ top_categories: "yes" });
    return res.status(201).json(viewProduct);
  } catch (error) {
    console.log(error);
  }
};
