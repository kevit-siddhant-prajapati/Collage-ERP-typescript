import * as express from 'express'
//const dotenv = require('dotenv')
//const path = require('path')
//require('./src/db/mongoose')

// const envPath = path.resolve(__dirname, '..','config', 'dev.env');
// const result = dotenv.config({path : envPath})
// if (result.error) {
//     throw result.error;
//   }
const app:express.Application = express()
const PORT = process.env.PORT;

import studentRouter from './components/students/students.router';
import staffRouter from './components/staffs/staffs.router';
import adminRouter from './components/admins/admin.router'; 
import attendanceRouter from './components/attendance/attendance.router';
//import userRouter from './components/user/user.router';

app.use(express.json())
app.use(studentRouter)
app.use(staffRouter)
app.use(adminRouter)
app.use(attendanceRouter)

const server = app.listen(PORT, ()=> {
    console.log('Server is running on port ', PORT)
})

export default server