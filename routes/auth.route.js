const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const { isAuthenticated } = require('../controllers/auth.controller')

const app = require("express");

router.post('/signUp', authController.signUpUser);

router.post('/verify', authController.verify_Mobile_Number);
router.post('/update-profile', isAuthenticated, authController.updateUserProfile)
router.get('/view-user-profiles', isAuthenticated, authController.GetUserProfiles)


module.exports = router;