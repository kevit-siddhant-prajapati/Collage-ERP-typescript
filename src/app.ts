import * as express from 'express';
//require('./src/db/mongoose')

const app = express()
const PORT = process.env.PORT || 3000;

const studentRouter = require('./components/students/students.router')
const staffRouter = require('./components/staffs/staffs.router')
const adminRouter = require('./routers/admin')

app.use(express.json())
app.use(studentRouter)
app.use(staffRouter)
app.use(adminRouter)

app.listen(PORT, ()=> {
    console.log('Server is running on port ', PORT)
})
