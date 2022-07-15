const router = require('express').Router();

router.use('/auth', require('./auth.route'));
// router.use('/product', require('./product'))
router.use('/vendor', require('./vendor'))
router.use('/application',require('./application'))

module.exports = router;

