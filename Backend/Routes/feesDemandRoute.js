const express = require('express');
const { createFeesDemand, getStudentsByBatch, addFine, getStudentFeeDetailsBySemester } = require('../Controller/feesDemandController');

const router = express.Router();

router.post("/fees/createDemand",createFeesDemand);
router.post("/fees/batch",getStudentsByBatch);
router.post("/fees/addFine",addFine);
router.post("/fees/student",getStudentFeeDetailsBySemester)

module.exports = router;