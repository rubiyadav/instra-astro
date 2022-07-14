
const express = require("express");
const router = express.Router();

const application = require("../controllers/Application");

//port Cart 
router.post('/cart',application.postCart)

//get Cart
router.get('/CartByID/:id', application.getCart)

//Delete api

// router.patch('/CartPatchByID/:id', product.CartPatch)
router.patch('/cartupdate/:id', application.CartPatch)

//Delete Cart
router.delete('/CartDelete/:id', application.DeleteCart)

//post Address
router.post('/Addresspost', application.postAddress)

//Get Address
router.get('/AddressByID/:id', application.getAddress)

//Patch api 
router.patch('/Addressupdate/:id', application.AddressPatch)

//Delete Api
router.delete('/addressDelete/:id', application.DeleteAddress)


// post payment
router.post('/Paymentpost', application.postPayment)

//patch api
router.patch('/paymentupdate/:id', application.patchPayment)

//Get Api for Payment
router.get('/PaymentByID/:id', application.getpayment)


//Delete api 
router.delete('/PaymentDelete/:id', application.DeletePayment)

//post api for order
router.post('/Orderpost', application.postOrder)

module.exports = router;