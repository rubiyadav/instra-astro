
const router = require('express').Router();

router.use('/auth', require('./auth.route'));


router.use('/user', require('./userdetailsRoutes'))

router.use('/Conection', require('./conectionRoutes'))


// router.use('/product', require('./product'))
router.use('/admin', require('./admin'))


router.use('/banner', require('./bannerRoutes'))

router.use('/notification', require('./usersettingRoutes'))



module.exports = router;


