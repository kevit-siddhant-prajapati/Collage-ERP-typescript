import * as express from 'express';
//require('./src/db/mongoose')

const app:express.Application = express()
const PORT = process.env.PORT || 3000;

import studentRouter from './components/students/students.router';
import staffRouter from './components/staffs/staffs.router';
import adminRouter from './components/admins/admin.router'; 
import userRouter from './components/user/user.router';

app.use(express.json())
app.use(studentRouter)
app.use(staffRouter)
app.use(adminRouter)
app.use(userRouter)

app.listen(PORT, ()=> {
    console.log('Server is running on port ', PORT)
})
