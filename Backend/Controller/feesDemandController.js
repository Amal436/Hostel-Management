const client = require("../db/database");
const catchAsyncError = require("../middleware/catchAsyncError");
const error = require("../middleware/error");
const ErrorHandler = require("../utils/ErrorHandler");

// Creating Demand for all the students of a batch

exports.createFeesDemand = catchAsyncError(async (req, res, next) => {
    const { batch, amount, last_date, alert_frequency } = req.body;

    const queryStr = `select * from student where student_id/100000 = ${batch}`;

    client.query(queryStr, (err, result) => {
        if (err) {
            return next(new ErrorHandler("Something went wrong while fetching data", 500));
        }
        let semester = result.rows[0].semester;
        let flag = true;

        for (let i = 0; i < result.rows.length; i++) {

            const { student_id, name } = result.rows[i];
            const request_date = new Date().toISOString().slice(0, 10);

            //console.log(request_date);
            const status = "pending";

            const queryStr2 = `INSERT INTO fees_demand (student_id,semester,name,raw_amount,status,request_date,alert_frequency,last_date,fine) VALUES ('${student_id}','${semester}','${name}','${amount}','${status}','${request_date}','${alert_frequency}','${last_date}',0)`;

            client.query(queryStr2, (err, result2) => {
                if (err && flag) {
                    flag = false;
                    console.log(err);
                    return next(new ErrorHandler("Something went wrong", 500));
                } else if (i === result.rows.length - 1 && flag) {
                    res.status(201).json({
                        success: true,
                        message: "Data inserted successfully"
                    })
                }
            })
        }
    })
})

// Extracting all the data of a student with totalPendingAmount till the current semester.

exports.getStudentsByBatch = catchAsyncError(async (req, res, next) => {
    const { batch } = req.body;
    const queryStr = `SELECT student_id,name,SUM(raw_amount+fine) AS total_pending_amount,status,payment_date,payment_mode,transaction_id
                      FROM fees_demand
                      WHERE status = 'pending' and student_id/100000=${batch}
                      GROUP BY student_id,name,status,payment_date,payment_mode,transaction_id`;
    client.query(queryStr, (err, result) => {
        if (err)
            return next(new ErrorHandler("Something went wrong while fetching data", 500));
        else {
            res.status(200).json({
                success: true,
                finalResult: result.rows
            })
        }
    })
})

// Adding fine to the students whose status is pending and deadline is over.

exports.addFine = catchAsyncError(async (req, res, next) => {

    const { batch, fine, last_date, alert_frequency } = req.body;

    const currentDate = Date.now();

    const queryStr = `UPDATE fees_demand
                      SET fine = fine + ${fine}
                      FROM student
                      WHERE fees_demand.student_id = student.student_id
                      AND fees_demand.status = 'pending'
                      AND fees_demand.semester = student.semester
                      AND student.student_id/100000 = 2020
                      AND to_timestamp(fees_demand.last_date, 'YYYY-MM-DD') < to_timestamp(${currentDate} / 1000.0)
                      `

    client.query(queryStr, (err, result) => {
        if (err){
            return next(new ErrorHandler("Something went wrong while adding fine",500));
        }
        else {
            res.status(200).json({
                success: true,
            })
        }
    })
})

// fees details for each student of all semesters

exports.getStudentFeeDetailsBySemester = catchAsyncError(async(req,res,next)=>{
    const {student_id} = req.body;
    const queryStr = `SELECT * FROM fees_demand WHERE student_id = ${student_id}`;
    client.query(queryStr,(err,result)=>{
        if(err){
            return next(new ErrorHandler("Something went wrong while fetching the data",505));
        }else{
            res.status(200).json({
                success:true,
                Result:result.rows
            })
        }
    })
})
