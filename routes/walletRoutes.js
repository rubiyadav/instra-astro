const express = require("express");
const router = express.Router();

const wallet = require('../controllers/WalletController')
const { isAuthenticated } = require('../controllers/auth.controller')

router.post('/wallet-data', isAuthenticated , wallet.walletPost)
router.get('/get-by-find/:id', isAuthenticated , wallet.GetByFind)
router.get('/get-by-id/:id', isAuthenticated , wallet.ViewWalletGetByID)



// router.get('wallet-view-data',wallet)



module.exports = router;


