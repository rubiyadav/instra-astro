const express = require("express");
const router = express.Router();


const Message = require('../controllers/messageController') 

router.post('/user-message', Message.SaveMessageByUsers)

router.get('/view-messgaes', Message.getMessageByUsers)

module.exports = router;