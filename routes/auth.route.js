const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const multer = require('multer');
const path = require("path");



const storage = multer.diskStorage({
    destination: function (req, file, cb) {cb(null,path.join(path.dirname(__dirname), "public/uploads"));},
  
  filename: function (req, file, cb) {
  cb(null, file.originalname)
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

router.patch('/update-user/:id', upload.single("profile"), authController.updateUser)

module.exports = router;