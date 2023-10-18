/**
 * @description this routers/students.js file contains routers students
 *  This file import Student models and perform CRUD operation on it
 */

//import * as bcrypt from "bcrypt";

/**
 * @description this router create new Student
 * it takes student object from postman and it to database
 */

import {Router} from "express";
//const Student = require('./students.model');
//import {studentsLogger} from "./students.logs"
//const router = Router()
import StudentController from "./students.controller";
require('../../../bin/database')

console.log('studets.router is running')
console.log(StudentController)
class StudentRoute {

    public router: Router = Router();

    private studentController: StudentController = new StudentController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get("/students", this.studentController.getStudent);
        this.router.get("/student/me/:id", this.studentController.getStudentProfile)
        this.router.post("/student/signup", this.studentController.postStudent)
        this.router.patch('/student/me/:id', this.studentController.updateStudent)
        this.router.delete('/student/me/:id', this.studentController.deleteStudent)
        this.router.patch('/students/attendance', this.studentController.fillAttendance)
    }
}

export default new StudentRoute().router;

//router.post('/student/signup', );




//router.get('/student/me/:id', )


// router.get('/students', async (req:Request, res:Response) => {
//     try {
//         const student = await Student.find({})
//         if(!student){
//             studentsLogger.error(`Unable to get data of all students`)
//             return res.status(404).send({error : 'student not exist'})
//         }
//         res.status(200).send(student)
//         studentsLogger.info('Fetching data of all students') 
//     } catch (e) {
//         studentsLogger.error('Internal server error!, unable to connect with application')
//         res.status(500).send({ error: 'Internal Server Error' });
//     }
// })





//router.delete('/student/me/:id', )


/** 
 * @description this require method import database.js file 
*/


/** 
 * @description responsible for running code on the server
*/
//module.exports = router; 


