const app = require("express");
const router = app.Router();
const { isAuthenticated } = require('../controllers/auth.controller')
const cart = require("../controllers/CartController");

//Add To  Cart 
router.post('/addcart/:id', isAuthenticated, cart.addToCart)

//get Cart
router.get('/cart', cart.getCart)

//Delete api
router.put('/cartupdate/:id', cart.updateQuantity)

// //Delete Cart
router.delete('/CartDelete/:id',cart.deletecart)

module.exports = router;


