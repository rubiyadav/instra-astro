const app = require("express");
const router = app.Router();

const { AddNotifaction, getNotifaction} = require('../controllers/NotificationController')
const { isAuthenticated } = require('../controllers/auth.controller')
router.post("/add-notifaction", isAuthenticated, AddNotifaction);
router.get("/notifaction",isAuthenticated, getNotifaction);

module.exports = router;

