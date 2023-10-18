/**
 * @description this routers/students.js file contains routers students
 *  This file import Student models and perform CRUD operation on it
 */


import {Router} from "express";
import StudentController from "./students.controller";
require('../../../bin/database')
import studentAuth from '../../middleware/studentAuth';

console.log('studets.router is running')
console.log(StudentController)
class StudentRoute {

    public router: Router = Router();

    private studentController: StudentController = new StudentController();

    constructor() {
        this.router = Router();
        //this.router.use(studentAuth)
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get("/students", studentAuth, this.studentController.getStudent);
        this.router.get("/student/me/:id", this.studentController.getStudentProfile)
        this.router.post("/student/signup", this.studentController.postStudent)
        this.router.patch('/student/me/:id', this.studentController.updateStudent)
        this.router.delete('/student/me/:id', this.studentController.deleteStudent)
        this.router.patch('/students/attendance', this.studentController.fillAttendance)
    }
}

export default new StudentRoute().router;



