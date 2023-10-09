var express = require('express');
//require('./src/db/mongoose')
var app = express();
var PORT = 3000;
var studentRouter = require('./routers/students');
var staffRouter = require('./routers/staffs');
app.use(express.json());
app.use(studentRouter);
app.use(staffRouter);
app.listen(PORT, function () {
    console.log('Server is running on port ', PORT);
});
