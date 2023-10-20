
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

    initializeRoutes():void {
        this.router.post('/student/attendance', staffAuth, this.attendanceController.fillStudentAttendance)
        this.router.post('/staff/attendance', adminAuth, this.attendanceController.fillStaffAttendance)
        this.router.patch('/student/attendance/update/:id', staffAuth, this.attendanceController.manageStudentAttendance)
        this.router.patch('/staff/attendance/update/:id', adminAuth, this.attendanceController.manageStudentAttendance)
    }
}

export default new AttendanceRoute().router;