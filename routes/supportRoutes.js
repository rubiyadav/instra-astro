const express = require("express");
const router = express.Router();

const Support = require('../controllers/SupportController')

router.post('/customer-support', Support.CustomerSupport)
router.get('/view-customer-details', Support.GetByFind)
router.get('/get-by-id/:id',Support.ViewCustomerDSupportGetByID)

module.exports = router;