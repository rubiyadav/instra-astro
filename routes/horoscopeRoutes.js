const express = require("express");
const router = express.Router();

const horoscope = require('../controllers/HoroscopeController')

router.get('/horoscope-get', horoscope.astro)
module.exports = router;

