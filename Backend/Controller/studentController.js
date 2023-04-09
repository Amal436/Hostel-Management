const csv = require('csv-parser');
const stream = require('stream');
const client = require('../db/database');
const catchAsyncError = require('../middleware/catchAsyncError');
const ErrorHandler = require('../utils/ErrorHandler');

exports.registerStudent = catchAsyncError(async (req, res, next) => {
    if (!req.file) {
        res.status(400).send('No file uploaded.');
        return;
    }
    const bufferStream = new stream.PassThrough();
    bufferStream.end(req.file.buffer);

    const results = [];
    // parse the CSV file using csv-parser
    bufferStream
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // do something with the parsed CSV data
            let count = results.length;
            for (let i = 0; i < results.length; i++) {
                const { student_id, name, semester, phone, email, flat_id, parent_phone } = results[i];
                const queryStr = `INSERT INTO student VALUES ('${student_id}','${name}','${semester}','${phone}','${email}','${flat_id}','${parent_phone}')`;
                client.query(queryStr, (err, res) => {
                    if (!err) {
                        console.log('data inserted successfully');
                    }
                })
            }
            res.status(200).json({
                success: true,
                message: 'Unique ids added successfully'
            })
        });
})