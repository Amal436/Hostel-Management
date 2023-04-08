const express = require('express');
const multer = require('multer');
const { registerStudent } = require('../Controller/studentController');

const upload = multer({ storage: multer.memoryStorage()});

const router = express.Router();

router.post("/registration",upload.single('csv'),registerStudent);

module.exports = router;