const app = require("express");
const router = app.Router();
const order = require('../controllers/OrderController')
const { isAuthenticated } = require('../controllers/auth.controller')
//post api for order
router.post('/addorder',order.postOrder)

//get order 
router.get('/Orderget/:id',order.getOrder)

//patch api 
router.patch('/Orderpatch/:id',order.patchOrder)

//Delete api for order 
router.delete('/Orderdelete/:id', order.DeleteOrder)

module.exports = router;
