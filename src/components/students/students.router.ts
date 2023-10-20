/**
 * @description this routers/students.js file contains routers students
 *  This file import Student models and perform CRUD operation on it
 */

import {Router} from "express";
import StudentController from "./students.controller";
require('../../../bin/database')
import studentAuth from '../../middleware/studentAuth';
import staffAuth from "../../middleware/staffAuth";
//import userAuth from "../../middleware/userAuth";
import adminAuth from "../../middleware/adminAuth";

class StudentRoute {

    public router: Router = Router();

    private studentController: StudentController = new StudentController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes(): void {
        this.router.get("/students", studentAuth , this.studentController.getStudent);
        this.router.get("/student/me", studentAuth, this.studentController.getStudentProfile)
        this.router.post("/student/signup", staffAuth, this.studentController.postStudent)
        this.router.patch('/student/me/:id', staffAuth, this.studentController.updateStudent)
        this.router.delete('/student/me/:id', staffAuth, this.studentController.deleteStudent)
        //this.router.patch('/students/attendance', staffAuth, this.studentController.fillAttendance)
        this.router.post('/student/login',this.studentController.studentLogin)
    }
}

export default new StudentRoute().router;



//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTJmYTY1Njc2Y2NlNjA5Y2M2ZTlmNmEiLCJpYXQiOjE2OTc3MTY4OTV9.KQq9qKcMySfaEu9jA8t35Gx_FVpTXh6aL5R_ZNobHZ0