const app = require("express");
const router = app.Router();

const {
  addItemToCart,
  getCartItems,
  removeCartItem,
} = require("../controllers/CartController");
const { authenticateUser } = require("../controllers/userController");

router.post("/user/cart/addtocart", authenticateUser, addItemToCart);
router.get("/user/getCartItems", authenticateUser, getCartItems);
router.post("/user/removeCartItem", authenticateUser, removeCartItem);

module.exports = router;
