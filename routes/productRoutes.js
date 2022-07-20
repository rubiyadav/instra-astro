const app = require("express");
const router = app.Router();

var multer = require("multer");
var storage = multer.diskStorage({
destination: function (req, file, cb) {
cb(null, "public/images");
},
filename: function (req, file, cb) {
cb(null, "product" + Date.now() + "_" + file.originalname);
},
});

var upload = multer({ storage: storage });

const {
                  searchProduct,
                  searchLowPriceProduct,
                  searchHighPriceProduct,
                  searchDiscountProduct,
                  searchPopularProduct,
                  viewProductAfterPayment,
                  filterProduct,
                  addProduct,
                  getAllProduct,
                  getProductDetail,
                  editProduct,
                  deleteProduct,
                  getFeaturedBrandProduct,
                  getHandPickedProduct,
                  addFeature,
                  getFeature,
                  editFeature,
                  deleteFeature,
                  getDealsOfTheDayProduct,
                  viewFeaturedBrandProduct,
                  viewTopCategoryProduct,
} = require("../controllers/productController");


router.get("/search-product", searchProduct);
router.get("/searchLowPriceProduct", searchLowPriceProduct);
router.get("/searchHighPriceProduct", searchHighPriceProduct);
router.get("/searchDiscountProduct", searchDiscountProduct);
router.get("/searchPopularProduct", searchPopularProduct);
router.get("/filterProduct", filterProduct);
router.get(
"/viewProductAfterPayment",
viewProductAfterPayment
);
router.post("/addProduct", upload.array("myField", 5), addProduct);
router.get("/getAllProduct", getAllProduct);
router.get("/getProductDetail/:id", getProductDetail);
router.post("/editProduct/:id", upload.array("myField", 5), editProduct);
router.get("/deleteProduct/:id", deleteProduct);

router.get("/getFeaturedBrandProduct", getFeaturedBrandProduct);
router.get("/getHandPickedProduct", getHandPickedProduct);
router.get("/getDealsOfTheDayProduct", getDealsOfTheDayProduct);

router.post("/addFeature/:id", addFeature);
router.get("/getFeature/:id", getFeature);
router.post("/editFeature/:id", editFeature);
router.get("/deleteFeature/:id", deleteFeature);

router.get("/viewFeaturedBrandProduct/:id", viewFeaturedBrandProduct);
router.get("/viewTopCategoryProduct/:id", viewTopCategoryProduct);

module.exports = router;
