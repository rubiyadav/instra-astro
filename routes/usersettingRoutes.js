const router = require('express').Router();
const express = require("express");

const notification = require('../controllers/NotificationController')
const { isAuthenticated } = require('../controllers/auth.controller')

router.post('/add-notification', isAuthenticated, notification.UserSettings)
router.get('/view-notification/:id', isAuthenticated,notification.ViewDataNotification)

module.exports = router;