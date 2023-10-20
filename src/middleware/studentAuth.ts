const jwt = require('jsonwebtoken')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Student = require('../components/students/students.model')
import { studentsLogger } from "../components/students/students.logs"
// export default async (req, res, next) => {
//     try {
//         //console.log("Student Authorization")
//         //below line request the authorization field from header , this will use to get token
//         const token = req.header('Authorization')
        
//         //Split the Bearer keyword from token
//         const tokenarr = token.split(' ')
//         console.log(tokenarr[1])
//         //verify jsonwebtoken
//         const decoded = jwt.verify(tokenarr[1], "secreteJwtToken")
//         console.log("0")
//         if(!decoded){
//             studentsLogger.error('Unable to verify token')
//             return new Error('do not verify token')
//         }
//         console.log("1")
//         //find the perticular student of given token
//         const student = await Student.findOne({_id : decoded._id, 'tokens.token':tokenarr[1]})
//         console.log("2")
//         if(!student){
//             studentsLogger.error('Student not found , authorization fail!')
//             throw new Error('Student not found')
//         }
//         req.token = tokenarr[1]
//         console.log("3")
//         studentsLogger.info(`Student ${student._id} is successfully login`)
//         console.log("4")
//         //set the value of student in req.student for further use in route
//         req.student = student
//         //console.log("student authe running")
//         next()
//     } catch (e){
//         studentsLogger.error(`Authentication fail! with error : ${e}`)
//         res.status(401).send({error : 'Please Authenticate'})
//     }
// }

// const jwt = require('jsonwebtoken')
// const User = require('../models/user')

export default async (req, res, next) =>{
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        //console.log(`this is token of middleware ${token}`)
        //console.log(res.body)
        const decoded = jwt.verify(token, "secreteJwtToken")   //there is problem
        //console.log(`this is decoded value ${decoded}`)
        //console.log(decoded)
        if(!decoded){
            throw Error('do not verify token')
        }
        const student = await Student.findOne({_id : decoded._id, 'tokens.token':token})
        //console.log(student)
        if(!student){
            throw new Error('User not found')
        }
        req.token = token
        req.student = student
        //return student(req,res, next)
        next()
        //next(student)
    } catch (e){
         res.status(401).send({error : `Please authenticate with Error: ${e}`})
    }
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3NzQ5MDF9.QpFd0In3H5cLt_upfFWw9pjBpupdb2YasrK29K7a50k
// module.exports = auth