const express = require('express');
const { createComplaint, getAllComplaints, getSingleComplaint, resolveComplaint, countComplaints, updateLiftStatus, getAllLiftStatus, assignWorker, findWorkers } = require('../Controller/complaintsController');
const router = express.Router();

router.post("/complaint/create",createComplaint);
router.post("/complaints",getAllComplaints);
router.post("/complaints/complaint",getSingleComplaint);
router.post("/complaints/complaint/resolve",resolveComplaint);
router.get("/complaints/count",countComplaints);
router.post("/lift/update",updateLiftStatus);
router.get("/lift/status",getAllLiftStatus);
router.post("/complaints/assign",assignWorker);
router.post("/job/workers",findWorkers);

module.exports = router;