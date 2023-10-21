const jwt = require('jsonwebtoken')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Student = require('../components/students/students.model')
import { studentsLogger } from "../components/students/students.logs"

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path")
const envPath = path.resolve(__dirname, '..', '..','config', 'dev.env');
const result = dotenv.config({path : envPath})
if (result.error) {
    throw result.error;
  }


export default async (req, res, next) =>{
    try {
        console.log('Student authenticate is calling')
        const token = req.header('Authorization').replace('Bearer ','');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_CODE)   //there is problem
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
