const bookidgen = require("bookidgen");
const Banner = require('../models/Banner')
const moment = require("moment");
const product = require('../models/product')

//post Banner

module.exports. postBanner= async (req, res) => {
  let { imgUrl } = req.body;

  try {
    if (!( imgUrl)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const banner = await Banner.create({
        imgUrl,
        id: bookidgen("ID", 14522, 199585),
        time: moment().format("llll"),
      });

      if (!banner) {
        res.json({ message: "Banner is not created", status: false });
      } else {
        res.json({
          message: "banner is created successfully",
          data: banner,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//get banner

module.exports.getBanner = async (req, res) => {
  try {
    const banner = await  Banner .findOne({ id: req.params.id });
    if (!banner) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "banner is found",
        data: banner,
        status: true
      });


    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//patch for Baner 
module.exports.patchbanner = async (req, res, next) => {
  let { imgUrl } = req.body;
  try {
    const banner = await Banner.findOneAndUpdate(
      { _id: req.params.id },
      {
        imgUrl

      },
      { new: true }
    );
    if (!banner) {
      res.json({ message: "Banner not updated", status: false });
    } else {
      res.json({
        message: "Banner updated successfully",
        status: true,
        banner: banner,
      });
    }
  } catch (error) { }
}

//delete for banner

module.exports.DeleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findOneAndDelete({ id: req.params.id });
    if (!banner) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: "banner is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};


//post api for product

module.exports.postproduct = async (req, res) => {
  let { productName, price, Reviews } = req.body;

  try {
    if (!(productName && price && Reviews)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const Product = await product.create({
        productName, price, Reviews,
        id: bookidgen("ID", 14522, 199585),
      });

      if (!Product) {
        res.json({ message: "product is not created", status: false });
      } else {
        res.json({
          message: "Product is created successfully",
          data: Product,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

// get product---------------

module.exports.getProduct = async (req, res) => {
  try {
    const Product = await product .findOne({ id: req.params.id });
    if (!Product) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Product is found",
        data: Product,
        status: true
      });


    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

//patch api for product

module.exports.patchproduct = async (req, res, next) => {
  let { productName, price, Reviews } = req.body;
  try {
    const Product = await product.findOneAndUpdate(
      { _id: req.params.id },
      {
        productName,
        price,
        Reviews,

      },
      { new: true }
    );
    if (!Product) {
      res.json({ message: "product not updated", status: false });
    } else {
      res.json({
        message: "product updated successfully",
        status: true,
        Product: Product,
      });
    }
  } catch (error) { }
}

// Delete product-----------------

module.exports.Deleteproduct = async (req, res) => {
  try {
    const Product = await product.findOneAndDelete({ id: req.params.id });
    if (!Product) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: "Product is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};

//get all product
module.exports.getProductAll = async (req, res) => {
  try {
    const Product = await product.find({ });
    if (!Product) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Product is found",
        data: Product,
        status: true
      });


    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};

