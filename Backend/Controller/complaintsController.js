const client = require("../db/database");
const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/ErrorHandler");

// Create new complaint

exports.createComplaint = catchAsyncError(async (req, res, next) => {
    const { type, subtype, description, raised_by } = req.body;
    const status = 'pending';
    const issue_date = new Date().toISOString().slice(0, 10);
    const issue_time = new Date().toLocaleTimeString();

    const queryStr = `insert into complaint (type,subtype,description,status,raised_by,issue_date,issue_time) values ('${type}','${subtype}','${description}','${status}','${raised_by}','${issue_date}','${issue_time}')`;

    client.query(queryStr, (err, result) => {
        if (err) {
            return next(new ErrorHandler("Some error occured", 400));
        }

        res.status(201).json({
            success: true,
            message: "data inserted successfully"
        })

    })

})

// get all complaint after a date

exports.getAllComplaints = catchAsyncError(async (req, res, next) => {
    const { date } = req.body;
    const queryStr = `select complaint.id,complaint.type,complaint.status, student.name as raised_by, worker.name as assignee,student.flat_id
    from complaint
    join student on complaint.raised_by = student.student_id and complaint.issue_date >= '${date}'
    join worker on complaint.worker_id = worker.id`;

    client.query(queryStr, (err, result) => {
        if (err) {
            return next(new ErrorHandler("Something went wrong while fetching complaints", 400));
        }
        res.status(200).json({
            success: true,
            Result: result.rows
        })
    })
})

// get Single complaint by complaint id

exports.getSingleComplaint = catchAsyncError(async (req, res, next) => {
    const { id } = req.body;
    const queryStr = `select complaint.id as c_id,complaint.type,complaint.subtype,complaint.description,complaint.status,student.student_id,student.name as raised_by,student.semester,student.phone,student.email,student.flat_id,student.parent_phone,complaint.issue_date,complaint.issue_time,complaint.expected_date,complaint.resolved_date,complaint.resolved_time,worker.id as w_id,worker.name as w_name,worker.agency,worker.job,worker.phone as w_phone,worker.visiting_frequency
    from complaint
    join student on complaint.raised_by = student.student_id and complaint.id = ${id}
    join worker on complaint.worker_id = worker.id`;

    client.query(queryStr, (err, result) => {
        if (err) {
            return next(new ErrorHandler("Something went wrong while fetching complaint", 400));
        }

        res.status(200).json({
            success: true,
            Result: result.rows
        })

    })
})