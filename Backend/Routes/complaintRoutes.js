const express = require('express');
const { createComplaint, getAllComplaints, getSingleComplaint, resolveComplaint, countComplaints } = require('../Controller/complaintsController');
const router = express.Router();

router.post("/complaint/create",createComplaint);
router.post("/complaints",getAllComplaints);
router.post("/complaints/complaint",getSingleComplaint);
router.post("/complaints/complaint/resolve",resolveComplaint);
router.get("/complaints/count",countComplaints);

module.exports = router;