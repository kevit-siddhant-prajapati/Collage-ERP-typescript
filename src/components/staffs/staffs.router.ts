/**
 * @description this routers/students.js file contains routers students
 */
import { Router} from "express"
require('../../../bin/database')
import StaffController from "./staffs.controller";
import staffAuth from "../../middleware/staffAuth";
import adminAuth from "../../middleware/adminAuth";

class StaffRoute {

    public router: Router = Router();

    private staffController: StaffController = new StaffController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes():void {
        this.router.post('/staff/signup', adminAuth, this.staffController.postStaff)
        this.router.get('/staff/me', staffAuth, this.staffController.getStaffProfile)
        this.router.get('/staffs', staffAuth, this.staffController.getStaffs)
        this.router.patch('/staff/me/:id', adminAuth, this.staffController.updateStaff)
        this.router.delete('/staff/me/:id', adminAuth, this.staffController.deleteStaff)
        this.router.post('/staff/login', this.staffController.staffLogin)
        this.router.post('/staff/logout', staffAuth,this.staffController.staffLogout)
    }
}

export default new StaffRoute().router;

/** 
 * @description export all router to use together
*/
//module.exports = router;