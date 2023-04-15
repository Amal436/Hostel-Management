const express = require('express');
const { createFeesDemand, getStudentsByBatch, addFine, getStudentFeeDetailsBySemester, updateFeesStatus, countFeesStatusByBatches, sendReminder } = require('../Controller/feesDemandController');

const router = express.Router();

router.post("/fees/createDemand",createFeesDemand);
router.post("/fees/batch",getStudentsByBatch);
router.post("/fees/addFine",addFine);
router.post("/fees/student",getStudentFeeDetailsBySemester);
router.post("/fees/student/payment",updateFeesStatus);
router.get("/fees/batches/status",countFeesStatusByBatches);
router.post("/fees/batch/reminder",sendReminder);

module.exports = router;