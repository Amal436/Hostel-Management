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

exports.getStudentCountBatchWiseInEachBlock = catchAsyncError(async (req, res, next) => {
    const queryStr = `SELECT SUBSTRING(flat_id, 1, 1) AS block, 
                      student_id/100000 AS batch, 
                      COUNT(*) AS count 
                      FROM student 
                      GROUP BY block, batch order by batch`;

    const data = {};

    client.query(queryStr, (err, result) => {
        if (err) return next(new ErrorHandler("something went wrong while fetching data", 401));
        result.rows.map((row, index) => {
            let year = "";
            if (index === 0) year = "first";
            else if (index === 1) year = "second";
            else if (index === 2) year = "third";
            else year = "fourth";
            const { block, batch, count } = row;
            if (!data[block]) data[block] = {};
            data[block]['name'] = block + ' block';
            data[block][year] = Number(count);
        })

        res.status(200).json({
            success: true,
            data
        })
    })

})