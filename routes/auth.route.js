const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, path.join(path.dirname(__dirname), "public"));
},

filename: function (req, upload, cb) {
const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
cb(null, file.fieldname + '-' + uniqueSuffix)
}
});
const upload = multer({ storage });


//signUpUser

router.post('/', authController.signUpUser);

//verify--
router.post('/verify', authController.verify_Mobile_Number);

//resetpassword
router.post('/resetpassword', authController.RestPassword);

//otpcheck
router.post('/otpcheck', authController.RestPasswordOtp);

//RestPasswordLink
router.post('/reset', authController.RestPasswordLink);

//login
router.post('/login', authController.login);

//SMS--
router.get('/sms', authController.sendsms);

//new passsword
router.post('/changePassword', authController.newPassword)

//patch api 
router.patch('/profile/:id', authController.patchEditProfile)

//patch roles
router.patch('/rolespatch/:id', authController.patchRoles)

router.patch('/update-user/:id', authController.updateUser)

module.exports = router;




