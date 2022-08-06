const express = require("express");
const router = express.Router();

const admin = require("../controllers/admin");

const { isAuthenticated } = require('../controllers/auth.controller')


router.post('/login-admin', admin.login);
router.post('/signup',admin.signUpUser);

router.post('/add-feedback', isAuthenticated,admin.UserFeedback)
router.get('/view-feedback', isAuthenticated,admin.ViewAllFeedback)


module.exports = router;