const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");
var ObjectId = require("mongodb").ObjectID;

module.exports.searchProduct = async (req, res) => {
  var regex = new RegExp(req.query.title, "i");
  Product.find({ title: regex }).then((result) => {
    res.status(200).json(result);
  });
};

module.exports.searchLowPriceProduct = async (req, res) => {
  try {
    const data = await Product.find({}).sort({ price: 1 });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchHighPriceProduct = async (req, res) => {
  try {
    const data = await Product.find({}).sort({ price: -1 });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchDiscountProduct = async (req, res) => {
  try {
    const data = await Product.find({ discount: "yes" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.searchPopularProduct = async (req, res) => {
  try {
    const data = await Product.find({ popular: "yes" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getFeaturedBrandProduct = async (req, res) => {
  try {
    const data = await Product.find({ category: "Featured Brands" });
    res.status(200).json({ response: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getHandPickedProduct = async (req, res) => {
  try {
    const data = await Product.find({ category: "Handpicked Item" });
    res.status(200).json({ response: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getDealsOfTheDayProduct = async (req, res) => {
  try {
    const data = await Product.find({ category: "Deals of the Day" });
    res.status(200).json({ response: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getHandPickedProduct = async (req, res) => {
  try {
    const data = await Product.find({ category: "Handpicked Item" });
    res.status(200).json({ response: data });
  } catch (error) {
    console.log(error);
  }
};

module.exports.filterProduct = async (req, res) => {
  try {
    const response = await Product.find(req.query);
    console.log(response);
    res.status(200).json({
      status: "success",
      data: {
        response,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewProductAfterPayment = async (req, res) => {
  const accessToken = req.cookies.accessToken;

  if (accessToken) {
    jwt.verify(accessToken, JWT_AUTH_TOKEN, async (err, phone) => {
      const { data } = phone;
      const getUser = await User.findOne({ phone: data });
      const { _id } = getUser;
      const getProduct = await Order.find({
        user: _id,
        paymentStatus: "completed",
      });
      res.status(200).json({ response: getProduct });
    });
  }
};

module.exports.addProduct = async (req, res) => {
  let productPictures = [];
  console.log(req.files)

  if (req.files.length > 0) {
    productPictures = req.files.map((file) => {
      return { img: file.filename };
    });
  }
  try {
    const {
      description,
      title,
      pack_size,
      country_origin,
      disclaimer,
      price,

    } = req.body;


    const create = await Product.create({
      description,
      title,
      pack_size,
      country_origin,
      disclaimer,
      price,
      productPictures

    });

    res.status(201).json({ msg: "product sccessfully added" });

  } catch (error) {
    console.log(error);
  }
};

module.exports.getAllProduct = async (req, res) => {
  try {
    const getProduct = await Product.find({});
    res.status(200).json({
      message: "Get all Product",
      getProduct
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getProductDetail = async (req, res) => {
  try {
    const getProduct = await Product.findById({ _id: ObjectId(req.params.id) });
    res.status(200).json({ data: getProduct });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editProduct = async (req, res) => {
  let profile = req.files;
  try {
    const {
      description,
      title,
      category,
      itemCategory,
      pack_size,
      country_origin,
      disclaimer,
      brand_name,
      manufacturer_name,
      price,
      discount_price,
      productForm,
      currentImage,
    } = req.body;

    const pricePercent = ((price - discount_price) * 100) / price;
    const discountPer = Math.round(pricePercent);

    if (profile) {
      const create = await Product.findByIdAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          description,
          title,
          category,
          itemCategory,
          pack_size,
          country_origin,
          disclaimer,
          brand_name,
          manufacturer_name,
          price,
          discount_price,
          discount_percentage: discountPer,
          productForm,
          productPictures: profile,
        }
      );
    } else {
      const create = await Product.findByIdAndUpdate(
        { _id: ObjectId(req.params.id) },
        {
          description,
          title,
          category,
          itemCategory,
          pack_size,
          country_origin,
          disclaimer,
          brand_name,
          manufacturer_name,
          price,
          discount_price,
          discount_percentage: discountPer,
          productForm,
          productPictures: currentImage,
        }
      );
    }
    res.status(201).json({ msg: " product sccessfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const response = await Product.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.addFeature = async (req, res) => {
  const { feature } = req.body;
  try {
    const addFeature = await Feature.create({
      product_id: req.params.id,
      feature,
    });
    res.status(200).json({ msg: "feature successfully added" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.getFeature = async (req, res) => {
  try {
    const getFeature = await Feature.find({
      product_id: ObjectId(req.params.id),
    });
    res.status(200).json({ response: getFeature });
  } catch (error) {
    console.log(error);
  }
};

module.exports.editFeature = async (req, res) => {
  const { feature } = req.body;
  try {
    const create = await Feature.findByIdAndUpdate(
      { _id: ObjectId(req.params.id) },
      {
        feature,
      }
    );
    res.status(201).json({ msg: "feature sccessfully updated" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteFeature = async (req, res) => {
  try {
    const response = await Feature.findByIdAndDelete({
      _id: ObjectId(req.params.id),
    });
    res.status(200).send({ msg: "Feature deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewFeaturedBrandProduct = async (req, res) => {
  try {
    const getBrand = await Brand.findById({ _id: ObjectId(req.params.id) });
    const featuredBrandProduct = await Product.find({
      brand_name: getBrand.name,
    });
    res.status(200).json(featuredBrandProduct);
  } catch (error) {
    console.log(error);
  }
};

module.exports.viewTopCategoryProduct = async (req, res) => {
  try {
    const getCategory = await Category.findById({
      _id: ObjectId(req.params.id),
    });
    const topCategoryProduct = await Product.find({
      itemCategory: getCategory.name,
    });
    res.status(200).json(topCategoryProduct);
  } catch (error) {
    console.log(error);
  }
};


