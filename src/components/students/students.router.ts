/**
 * @description this routers/students.js file contains routers students
 *  This file import Student models and perform CRUD operation on it
 */

import {Router} from "express";
import StudentController from "./students.controller";
require('../../../bin/database')
import studentAuth from '../../middleware/studentAuth';
import staffAuth from "../../middleware/staffAuth";
import adminAuth from "../../middleware/adminAuth";

class StudentRoute {

    public router: Router = Router();

    private studentController: StudentController = new StudentController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }
/**
 * @description below route joint route with different methods of controller
 */
initializeRoutes(): void {
        this.router.get("/students", studentAuth , this.studentController.getStudent); //getting data of all student
        this.router.get("/student/me", studentAuth, this.studentController.getStudentProfile) //getting data of authnticate student
        this.router.post("/student/signup", staffAuth, this.studentController.postStudent)  // create new student
        this.router.patch('/student/me/:id', staffAuth, this.studentController.updateStudent)  //update student using studentId
        this.router.delete('/student/me/:id', staffAuth, this.studentController.deleteStudent) //delete student using Id as well as releted attendance
        this.router.post('/student/login',this.studentController.studentLogin) // for login student
        this.router.post('/student/logout', studentAuth,this.studentController.studentLogout) //logout student 
        this.router.get('/studentGroupByYear/analysis1', adminAuth, this.studentController.studentGroupByYear) // analysis1
    }
}

export default new StudentRoute().router;