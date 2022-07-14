const router = require('express').Router();
const product = require('../controllers/product');

//post api product
router.post('/product', product.postproduct)

//get product

router.get('/ProductByID/:id', product.getProduct);

//patch product
router.patch('/productPatch/:id',product.patchproduct)

//Delete api
router.delete('/productDelete/:id', product.Deleteproduct)

//get all
router.get('/Productall', product.getProductAll);

//port Cart 
router.post('/cart', product.postCart)

//get Cart
router.get('/CartByID/:id', product.getCart)

//Delete api

// router.patch('/CartPatchByID/:id', product.CartPatch)
router.patch('/cartupdate/:id', product.CartPatch)


//Delete Cart
router.delete('/CartDelete/:id', product.DeleteCart)

//post Address
router.post('/Addresspost', product.postAddress)

//Get Address
router.get('/AddressByID/:id', product.getAddress)

//Patch api 
router.patch('/Addressupdate/:id', product.AddressPatch)

//Delete Api
router.delete('/addressDelete/:id', product.DeleteAddress)

// post payment
router.post('/Paymentpost', product.postPayment)

//patch api
router.patch('/paymentupdate/:id', product.patchPayment)

//Get Api for Payment
router.get('/PaymentByID/:id', product.getpayment)


//Delete api 
router.delete('/PaymentDelete/:id', product.DeletePayment)

//post api
// router.post('/Orderpost', product.postprudctOrder)
router.post('/Orderpost', product.postOrder)

module.exports = router;

