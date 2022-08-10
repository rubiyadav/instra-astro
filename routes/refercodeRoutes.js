const express = require("express");
const router = express.Router();

const ReferCode = require('../controllers/RefercodeController')
const { isAuthenticated } = require('../controllers/auth.controller')

router.post('/refer-code', isAuthenticated ,ReferCode.AddReferCode)
router.get('/refer-code-view', isAuthenticated , ReferCode.ReferCodeView)
router.get('/refer-code-by-id/:id',ReferCode.ReferCodeView)


module.exports = router;
