const express = require('express');
const { createComplaint, getAllComplaints, getSingleComplaint } = require('../Controller/complaintsController');
const router = express.Router();

router.post("/complaint/create",createComplaint);
router.post("/complaints",getAllComplaints);
router.post("/complaints/complaint",getSingleComplaint);

module.exports = router;