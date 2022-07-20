const Cart = require("../models/Cart");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

function runUpdate(condition, updateData) {
  return new Promise((resolve, reject) => {
    //you update code here
    Cart.findOneAndUpdate(condition, updateData, { upsert: true })
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
}

module.exports.addItemToCart = async (req, res) => {
      const getUser = await User.findById(req.user);

      Cart.findOne({ user: getUser._id }).exec((error, cart) => {
        if (error) return res.status(400).json({ error });
        if (cart) {
          //if cart already exists then update cart by quantity
          let promiseArray = [];
          console.log(req.body.cartItems)
          req.body.cartItems.forEach((cartItem) => {
            const product = cartItem.product;
            const item = cart.cartItems.find((c) => c.product.toString() == product);
            let condition, update;
            if (item) {
              condition = { user: getUser._id, "cartItems.product": product };
              update = {
                $set: {
                  "cartItems.$": cartItem,
                },
              };
            } else {
              condition = { user: getUser._id };
              update = {
                $push: {
                  cartItems: cartItem,
                },
              };
            }
            promiseArray.push(runUpdate(condition, update));
          });
          Promise.all(promiseArray)
            .then((response) => res.status(201).json({ response }))
            .catch((error) => res.status(400).json({ error }));
        } else {
          //if cart not exist then create a new cart
          const cart = new Cart({
            user: getUser._id,
            cartItems: req.body.cartItems,
          });

          cart.save((error, cart) => {
            if (error) {
              return res.status(400).json({ error });
            }
            if (cart) {
              return res.status(201).json({ cart });
            }
          });
        }
      });

};

module.exports.getCartItems = async (req, res) => {
  try{
    console.log(req.user)
    const getCartItems = await Cart.find({user:req.user})
    .populate("cartItems.product")
    res.status(200).json({
      data:getCartItems
    })

  }catch(error){
    res.status(500).json({
      message:error.message
    })
  }
  }


module.exports.removeCartItem = async (req, res) => {
      const getUser = await User.findById(req.user);
      const { productId } = req.body;
      if (productId) {
        Cart.updateOne(
          { user: getUser._id },
          {
            $pull: {
              cartItems: {
                product: productId,
              },
            },
          }
        ).exec((error, result) => {
          if (error) return res.status(400).json({ error });
          if (result) {
            res.status(202).json({ result });
          }
        });
      }
  
  }

