const express = require("express");
const router = express.Router();

// router.use('/live',require('./livesessionRoutes'))
const livesession = require('../controllers/liveSessionController')

router.post('/live-session', livesession.LiveSession)

module.exports = router;