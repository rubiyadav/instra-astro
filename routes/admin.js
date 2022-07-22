const express = require("express");
const router = express.Router();

const admin = require("../controllers/admin");

const { isAuthenticated } = require('../controllers/auth.controller')

//Banners

//post banner
// router.post('/Bannerpost', admin.postBanner)

// //get banner
// router.get('/Bannerget/:id', admin.getBanner)

// //patch banner
// router.patch('/Bannerpatch/:id', admin.patchbanner)

// //Delete
// router.delete('/Bannerdelete/:id', admin.DeleteBanner)


//get all

// router.get('/Productall', isAuthenticated, admin.getProductAll);

router.post('/login', admin.login);
router.post('/', admin.signUpUser);


module.exports = router;
