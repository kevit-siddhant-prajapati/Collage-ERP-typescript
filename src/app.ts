const express = require('express')
//require('./src/db/mongoose')

const app = express()
const PORT = 3000;

const studentRouter = require('./routers/students')
const staffRouter = require('./routers/staffs')
const adminRouter = require('./routers/admin')

app.use(express.json())
app.use(studentRouter)
app.use(staffRouter)
app.use(adminRouter)


app.listen(PORT, ()=> {
    console.log('Server is running on port ', PORT)
})
