const express = require("express");
const router = express.Router();

const wallet = require('../controllers/WalletController')

router.post('/wallet-data', wallet.walletPost)

// router.get('wallet-view-data',wallet)



module.exports = router;


