const express = require('express');
const app = express();
const ErrorHandler = require('./middleware/error');
//middleware

app.use(express.json());

// import routes
const studentRoute = require('./Routes/studentRoutes');
const feesDemandRoute = require('./Routes/feesDemandRoute');
const complaintRoute = require('./Routes/complaintRoutes');

app.use("/api/v1",studentRoute);
app.use("/api/v1",feesDemandRoute);
app.use("/api/v1",complaintRoute);

app.use(ErrorHandler);
module.exports = app;
