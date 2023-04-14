const express = require('express');
const multer = require('multer');
const { registerStudent, getStudentCountBatchWiseInEachBlock } = require('../Controller/studentController');

const upload = multer({ storage: multer.memoryStorage()});

const router = express.Router();

router.post("/registration",upload.single('csv'),registerStudent);
router.get("/count",getStudentCountBatchWiseInEachBlock)

module.exports = router;