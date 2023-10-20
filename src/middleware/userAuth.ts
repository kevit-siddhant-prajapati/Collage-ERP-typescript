import staffAuth from "./staffAuth";
import studentAuth from "./studentAuth";
import adminAuth from "./adminAuth";
import { studentsLogger } from "../components/students/students.logs"
// import jwt from 'jsonwebtoken'
// const Student = require('../components/students/students.model')

 const userAuth = {
//     studentAuth: studentAuth ,
     staffAuth : staffAuth,
     adminAuth : adminAuth
 }
//console.log(userAuth.studentAuth, userAuth.staffAuth, userAuth.adminAuth)


export default async (req, res, next) => {
    try {
        const role=req.body.role
        let loginUser
        if(role === "Student"){
            return studentAuth(req, res, next)
        } else if (role === "Staff"){
            return userAuth.staffAuth(req, res, next)
        } else if (role === "Admin") {
            return userAuth.adminAuth(req, res, next)
        } else {
            res.status(400).send("Enter valid role")
        }
        next(loginUser)
    } catch (e){
        studentsLogger.error(`Authentication fail! with error : ${e}`)
    }
}

