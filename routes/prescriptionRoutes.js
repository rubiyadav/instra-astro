const app = require("express");
const router = app.Router();

// const { isAuthenticated } = require('../controllers/auth.controller')

const { addPrescription } = require("../controllers/AddPrescriptionController");
const prescription = require('../controllers/AddPrescriptionController')

router.post("/addPrescription", prescription.addPrescription);

module.exports = router;

