const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

var upload = multer({ storage: storage });

const {
  addCategory,
  viewCategory,
  editCategory,
  deleteCategory,
  viewTopCat,
} = require("../controllers/CategoryController");

router.post("/addCategory", upload.single("myField"), addCategory);
router.get("/viewCategory", viewCategory);
router.post("/editCategory/:id", upload.single("myField"), editCategory);
router.get("/deleteCategory/:id", deleteCategory);

router.get("/viewTopCat", viewTopCat);

module.exports = router;
