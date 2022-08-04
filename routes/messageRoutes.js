const express = require("express");
const router = express.Router();


const messageController = require('../controllers/messageController') 

router.post('/user-message', messageController.SaveMessageByUsers)

router.get('/view-messgaes', messageController.getMessageByUsers)

module.exports = router;