const express = require("express");
const router = express.Router();

const vendor = require("../controllers/vendor");

//Banners

//post banner
router.post('/Bannerpost', vendor.postBanner)

//get banner
router.get('/Bannerget/:id', vendor.getBanner)

//patch banner
router.patch('/Bannerpatch/:id', vendor.patchbanner)

//Delete
router.delete('/Bannerdelete/:id',vendor.DeleteBanner)


//post api product
router.post('/product', vendor.postproduct)

//get product

router.get('/ProductByID/:id', vendor.getProduct);

//patch product
router.patch('/productPatch/:id', vendor.patchproduct)

//Delete api
router.delete('/productDelete/:id', vendor.Deleteproduct)

//get all
router.get('/Productall', vendor.getProductAll);

module.exports = router;