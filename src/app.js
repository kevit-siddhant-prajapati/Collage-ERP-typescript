"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
//require('./src/db/mongoose')
var app = express();
var PORT = process.env.PORT || 3000;
var studentRouter = require('./components/students/students.router');
var staffRouter = require('./components/staffs/staffs.router');
var adminRouter = require('./routers/admin');
app.use(express.json());
app.use(studentRouter);
app.use(staffRouter);
app.use(adminRouter);
app.listen(PORT, function () {
    console.log('Server is running on port ', PORT);
});
