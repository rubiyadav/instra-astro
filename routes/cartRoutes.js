const app = require("express");
const router = app.Router();
const { isAuthenticated } = require('../controllers/auth.controller')
const cart = require("../controllers/CartController");

//port Cart 
router.post('/cart', isAuthenticated, cart.postCart)
// router.post('/cart',cart,isAuthenticated.postCart)

//get Cart
router.get('/CartByID/:id',isAuthenticated,cart.getCart)

//Delete api
router.patch('/cartupdate/:id',isAuthenticated, cart.CartPatch)

//Delete Cart
router.delete('/CartDelete/:id',isAuthenticated,cart.DeleteCart)


module.exports = router;
