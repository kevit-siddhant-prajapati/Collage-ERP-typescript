import express from 'express';
//require('./src/db/mongoose')

const app = express()
const PORT = 3000;

const studentRouter = require('./routers/students')
const staffRouter = require('./routers/staffs')
const adminRouter = require('./routers/admin')

console.log('This is student',studentRouter)
console.log('This is Client',staffRouter)
console.log('This is Admin',adminRouter)
app.use(express.json())
app.use(studentRouter)
app.use(staffRouter)
app.use(adminRouter)

app.listen(PORT, ()=> {
    console.log('Server is running on port ', PORT)
})
