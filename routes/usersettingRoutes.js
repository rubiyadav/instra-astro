const router = require('express').Router();
const express = require("express");

const notification = require('../controllers/notificationController')
const { isAuthenticated } = require('../controllers/auth.controller')

router.post('/add-notification',isAuthenticated,notification.UserSettings)

module.exports = router;