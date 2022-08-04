const express = require("express");
const router = express.Router();

const livesession = require('../controllers/liveSessionController')

router.post('/live-session', livesession.LiveSession)
router.patch('/update-live-session/:id', livesession.LiveSessionUpdate)
router.get('/upcoming-live-session', livesession.UpcommingLiveSession)
router.get('/active-live-session/:id', livesession.ActiveLiveSession)


module.exports = router;

