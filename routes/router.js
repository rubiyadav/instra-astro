const { required } = require('nodemon/lib/config');

const router = require('express').Router();

router.use('/auth', require('./auth.route'));
// router.use('/product', require('./product'))
router.use('/admin', require('./admin'))
// router.use('/admin', require('./admin'));
// router.js
// router.use('/application', require('./application'))

router.use('/product', require('./productRoutes'))

router.use('/banner', require('./bannerRoutes'))

router.use('/notification', require('./NotificationRoutes'))

router.use('/cart', require('./cartRoutes'))

router.use('/category', require('./topCategoryRoutes'))

router.use('/order', require('./orderRoutes'))

router.use('/prescription',require('./prescriptionRoutes'))


module.exports = router;


