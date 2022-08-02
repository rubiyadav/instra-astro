const express = require("express");
const router = express.Router();

const wallet = require('../controllers/WalletController')

router.post('/wallet-data', wallet.walletPost)
router.get('/get-by-find/:id', wallet.GetByFind)
router.get('/get-by-id/:id', wallet.ViewWalletGetByID)



// router.get('wallet-view-data',wallet)



module.exports = router;


