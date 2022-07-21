// // const Cart = require("../models/Cart");

const cart = require('../models/cart')
const bookidgen = require("bookidgen");
// Cart post api

module.exports.postCart = async (req, res) => {
  let { User_id, Products } = req.body;

  try {
    if (!(User_id && Products)) {
      res.json({ message: "All fields are required", status: false });
    } else {
      const Cart = await cart.create({
        User_id, Products,
        id: bookidgen("ID", 14522, 199585),
      });

      if (!Cart) {
        res.json({ message: "Cart is not created", status: false });
      } else {
        res.json({
          message: "Add to Cart is  successfully",
          data: Cart,
          status: true,
        });
      }
    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//get api for Cart

module.exports.getCart = async (req, res) => {
  try {
    const Cart = await cart.findOne({ id: req.params.id });
    if (!Cart) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.json({
        message: "Cart is found",
        data: Cart,
        status: true
      });


    }
  } catch (error) {
    res.json({ message: error.message, status: false });
  }
};


//Cart for Patch

module.exports.CartPatch = async (req, res, next) => {
  let { User_id, Products } = req.body;
  try {
    const Cart = await cart.findOneAndUpdate(
      { _id: req.params.id },
      {
        User_id,
        Products,

      },
      { new: true }
    );
    if (!Cart) {
      res.json({ message: "Carts not updated", status: false });
    } else {
      res.json({
        message: "Carts updated successfully",
        status: true,
        Cart: Cart,
      });
    }
  } catch (error) { }
}


//Delete Api
module.exports.DeleteCart = async (req, res) => {
  try {
    const Cart = await cart.findOneAndDelete({ id: req.params.id });
    if (!Cart) {
      res.json({ message: "Enter the correct id", status: false });
    } else {
      res.send({ message: "carts is deleted successfully", status: true });
    }
  } catch (error) {
    res.send({ message: error.message, status: false });
  }
};







































































