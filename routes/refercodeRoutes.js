const express = require("express");
const router = express.Router();

const ReferCode = require('../controllers/RefercodeController')

router.post('/refer-code', ReferCode.AddReferCode)
router.get('/refer-code-view', ReferCode.ReferCodeView)
router.get('/refer-code-by-id/:id',ReferCode.ReferCodeView)


module.exports = router;