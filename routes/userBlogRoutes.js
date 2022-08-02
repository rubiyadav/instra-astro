const express = require("express");
const router = express.Router();

const blog = require("../controllers/UserBlogController");

const { isAuthenticated } = require('../controllers/auth.controller')


const path = require("path");
var multer = require("multer");
var storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "public/images"); },
filename: function (req, file, cb) {
                  cb(null, Date.now + file.originalname);
                  },
});

var upload = multer({ storage: storage });


router.post('/user-blog', isAuthenticated, upload.single("myField"), blog.postuserBlogs)
// router.get('/get-blogs/:id', isAuthenticated, userblogs.ViewDataBlogs)
router.patch('/edit-user-blog/:id', isAuthenticated, upload.single("myField"), blog.UpdateBlogs)
router.delete('/remove-blog/:id', isAuthenticated, blog.RemovedBlogs)
router.get('/get-all', isAuthenticated, blog.GetByFind)


module.exports = router;