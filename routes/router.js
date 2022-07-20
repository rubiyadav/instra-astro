const router = require('express').Router();

router.use('/auth', require('./auth.route'));
// router.use('/product', require('./product'))
router.use('/admin', require('./admin'))
// router.use('/admin', require('./admin'));
// router.js
router.use('/application', require('./application'))

router.use('/product', require('./productRoutes'))

module.exports = router;


