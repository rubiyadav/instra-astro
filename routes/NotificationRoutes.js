const app = require("express");
const router = app.Router();

const { AddNotifaction, getNotifaction } = require("../controllers/NotifactionController");
const { authenticateUser } = require("../controllers/userController");

router.post("/add-notifaction", authenticateUser, AddNotifaction);
router.get("/notifaction", authenticateUser, getNotifaction);

module.exports = router;