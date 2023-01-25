const express = require("express");
const {createApplicant,getApllicant,getApllicantById,searchApplicant,deleteApplicant}= require('../controller/applicantController')
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });
router.post("/createApplicant",upload.single('resume'), createApplicant);
router.get("/getApllicant", getApllicant);
router.delete("/deleteApplicant/:id", deleteApplicant);
router.get("/getApllicantById/:id", getApllicantById);
router.get("/searchApplicant/:firstName", searchApplicant);

module.exports = router;
