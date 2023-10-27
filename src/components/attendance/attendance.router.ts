
import { Router} from "express"
require('../../../bin/database')
import AttendanceController from "./attendance.controller";
import adminAuth from "../../middleware/adminAuth";
import staffAuth from "../../middleware/staffAuth";


class AttendanceRoute {

    public router:Router = Router()

    private attendanceController:AttendanceController = new AttendanceController()

    constructor(){
        this.router = Router()
        this.initializeRoutes()
    }
/**
 * @description below given initializeRoutes connect route with controller methods
 */
initializeRoutes():void {
        this.router.post('/student/attendance', staffAuth, this.attendanceController.fillStudentAttendance) // fill attendance of student
        this.router.post('/staff/attendance', adminAuth, this.attendanceController.fillStaffAttendance) // fill attendance of staff
        this.router.patch('/student/attendance/update/:id', staffAuth, this.attendanceController.manageStudentAttendance) // change attendance of student with id
        this.router.patch('/staff/attendance/update/:id', adminAuth, this.attendanceController.manageStudentAttendance) // change attendance of staff using id
        this.router.get('/students/get-attendance', adminAuth, this.attendanceController.getStudentsAttendance) // get attendance of all student
        this.router.get('/staffs/get-attendance', adminAuth, this.attendanceController.getStaffsAttendance) // get attendance of all staff
        this.router.post('/student-attendance-by-date', adminAuth, this.attendanceController.getAbsentStudent) // analysis2
        this.router.post('/student-with-less-attendance/analysis3', adminAuth, this.attendanceController.studentLessAttendance) // analysis3
        this.router.post('/student-intake-analysis', adminAuth, this.attendanceController.studentIntakeAnalysis) // analysis4
    }
}

export default new AttendanceRoute().router;