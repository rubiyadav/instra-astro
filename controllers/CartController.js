const Cart = require("../models/Cart");
const moment = require("moment")

exports.addToCart = async (req, res, next) => {
  console.log("user", req.user)
  try {
    const product = req.params.id;
    let cart = await Cart.findOne({
      user: req.user,
    });

    if (!cart) {
      cart = await createCart(req.user);
    }
    console.log("cart", cart)

    const productIndex = cart.products.findIndex((cartProduct) => {
      return cartProduct.product.toString() == product;
    });
    console.log("cart", productIndex)


    if (productIndex < 0) {
      cart.products.push({ product });
    } else {
      cart.products[productIndex].quantity++;
    }

    await cart.save();

    return res.status(200).json({
      msg: "product added to cart",
    });
  } catch (error) {
    next(error);
  }
};

const createCart = async (userId) => {
  try {
    const cart = await Cart.create({ user: userId });

    return cart;
  } catch (error) {
    throw error;
  }
};

//Update 
exports.updateQuantity = async (req, res, next) => {
  try {
    const product = req.params.id;
    const { quantity } = req.body;
    let cart = await Cart.findOne({
      user: req.user,
    });

    if (!cart) {
      cart = await createCart(req.user);
    }

    const productIndex = cart.products.findIndex((cartProduct) => {
      return cartProduct.product.toString() == product;
    });

    if (productIndex < 0 && quantity > 0) {
      cart.products.push({ product, quantity });
    } else if (productIndex >= 0 && quantity > 0) {
      cart.products[productIndex].quantity = quantity;
    } else if (productIndex >= 0) {
      cart.products.splice(productIndex, 1);
    }

    await cart.save();

    const cartResponse = await getCartResponse(cart);

    return res.status(200).json({
      success: true,
      msg: "cart updated",
      cart: cartResponse,
    });
  } catch (error) {
    next(error);
  }
};
const getCartResponse = async (cart) => {
  try {
    await cart.populate([
      { path: "products.product", select: { reviews: 0 } },
      // { path: "coupon", select: "couponCode discount expirationDate" },
    ]);

    if (cart.coupon && moment().isAfter(cart.coupon.expirationDate, "day")) {
      cart.coupon = undefined;
      cart.save();
    }
    const cartResponse = cart.toObject();

    let discount = 0;
    let total = 0;
    cartResponse.products.forEach((cartProduct) => {
      cartProduct.total = cartProduct.product.price * cartProduct.quantity;
      total += cartProduct.total;
    });

    if (cartResponse.coupon) {
      discount = 0.01 * cart.coupon.discount * total;
    }

    cartResponse.subTotal = total;
    cartResponse.discount = discount;
    cartResponse.total = total - discount;
    cartResponse.shipping = 10;

    return cartResponse;
  } catch (error) {
    throw error;
  }
};
//get api for Cart
exports.getCart = async (req, res, next) => {
  console.log(req.user)
  try {
    const cart = await Cart.findOne(req.user);

    const cartResponse = await getCartResponse(cart);

    return res.status(200).json({
      success: true,
      msg: "cart",
      cart: cartResponse
    })
  } catch (error) {
    next(error);
  }
}



//Removed
exports.deletecart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart Remove Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something Went Wrong" });
  }
};

exports.removeCart = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};









