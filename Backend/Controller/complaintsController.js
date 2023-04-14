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
    if (!req.body.date) {
        return next(new ErrorHandler("parameter is not named correctly", 400));
    }
    const { date } = req.body;
    const queryStr = `select complaint.id,complaint.type,complaint.status,complaint.issue_date as raised_date, student.name as raised_by, worker.name as assignee,student.flat_id
    from complaint
    join student on complaint.raised_by = student.student_id and complaint.issue_date >= '${date}'
    left outer join worker on complaint.worker_id = worker.id`;

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
    left outer join worker on complaint.worker_id = worker.id`;

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

// Resolve complaint -->student.

exports.resolveComplaint = catchAsyncError(async (req, res, next) => {
    const resolved_date = new Date(Date.now()).toISOString().slice(0, 10);
    const resolved_time = new Date().toLocaleTimeString();
    const { id } = req.body;
    const queryStr = `update complaint set status = 'resolved',resolved_date = '${resolved_date}',resolved_time = '${resolved_time}' where id = ${id}`;
    client.query(queryStr, (err, result) => {
        if (err) return next(new ErrorHandler("something went wrong while updating complaint", 400));
        if (result.rowCount === 0) return next(new ErrorHandler("complaint not found with this id", 404));
        res.status(200).json({
            success: true,
        })
    })
})

// Count complaints by their type and status

exports.countComplaints = catchAsyncError(async (req, res, next) => {
    const queryStr = `SELECT type, status, COUNT(*) as count
                      FROM complaint
                      GROUP BY type, status;`
    client.query(queryStr, (err, result) => {
        if (err) return next(new ErrorHandler("something went wrong while counting the complaints", 400));

        let cnt_ep = 0, cnt_er = 0, cnt_pp = 0, cnt_pr = 0, cnt_hp = 0, cnt_hr = 0, cnt_cp = 0, cnt_cr = 0;
        for (let i = 0; i < result.rows.length; i++) {
            const { type, status, count } = result.rows[i];
            if (type === 'electrical') {
                if (status === 'pending') cnt_ep = Number(count);
                else cnt_er = Number(count);
            }
            else if (type === 'plumbing') {
                if (status === 'pending') cnt_pp = Number(count);
                else cnt_pr = Number(count);
            }
            else if (type === 'house_keeping') {
                if (status === 'pending') cnt_hp = Number(count);
                else cnt_hr = Number(count);
            }
            else if (type === 'carpenter') {
                if (status === 'pending') cnt_cp = Number(count);
                else cnt_cr = Number(count);
            }
        }
        const Result = {
            electrical: {
                pending: cnt_ep,
                resolved: cnt_er
            },
            plumbing: {
                pending: cnt_pp,
                resolved: cnt_pr
            },
            house_keeping: {
                pending: cnt_hp,
                resolved: cnt_hr
            },
            carpenter: {
                pending: cnt_cp,
                resolved: cnt_cr
            }
        }
        res.status(200).json({
            success: true,
            Result
        })
    })
})

//update lift status

exports.updateLiftStatus = catchAsyncError(async (req, res, next) => {
    const { block, status } = req.body;
    const queryStr = `update lift_status set status = '${status}' where block = '${block}'`;

    client.query(queryStr, (err, result) => {
        if (err) return next(new ErrorHandler("something went wrong while updating lift status", 500));
        res.status(200).json({
            success: true,
            message: "lift status updated successfully"
        })
    })
})

// get all lift status

exports.getAllLiftStatus = catchAsyncError(async (req, res, next) => {
    const queryStr = `select * from lift_status order by block`;
    client.query(queryStr, (err, result) => {
        if (err) return next(new ErrorHandler("something went wrong while getting all lift status", 500));
        res.status(200).json({
            success: true,
            data: result.rows
        })
    })
})

// Assign worker for same type of complaints

exports.assignWorker = catchAsyncError(async (req, res, next) => {
    const { idList, worker_id } = req.body;
    const queryStr1 = `SELECT COUNT(DISTINCT type) = 1 AS same
                       FROM complaint
                       WHERE id IN (${idList})`;
    client.query(queryStr1, (err, result) => {
        if (err) return next(new ErrorHandler("something went wrong while assigning worker", 401));

        if (!result.rows[0].same) return next(new ErrorHandler("all complaints should be of same type", 500));

        const queryStr2 = `select type from complaint where id = ${idList[0]}`;
        client.query(queryStr2, (err, result) => {
            if (err) return next(new ErrorHandler("something went wrong while selecting complaint type", 500));
            const c_type = result.rows[0].type;

            const queryStr3 = `select job from worker where id = ${worker_id}`;
            client.query(queryStr3, (err, result) => {
                if (err) return next(new ErrorHandler("something went wrong while selecting job", 500));
                const job = result.rows[0].job;
                if (job !== c_type) return next(new ErrorHandler("can't assign worker", 500));

                const queryStr4 = `UPDATE complaint
                                   SET worker_id = ${worker_id}
                                   WHERE id IN (${idList}) AND status = 'pending'`;
                client.query(queryStr4, (err, result) => {
                    if (err) next(new ErrorHandler("something went wrong while updating worker id", 401));
                    res.status(200).json({
                        success: true,
                        message: "worker assigned successfully"
                    })
                })
            })

        })

    })
})

