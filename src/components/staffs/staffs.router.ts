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
/**
 * @description below given are connected with methods of staffController
 */
initializeRoutes():void {
        this.router.post('/staff/signup', adminAuth, this.staffController.postStaff) //create new staff
        this.router.get('/staff/me', staffAuth, this.staffController.getStaffProfile) //getting info of authenticated staff
        this.router.get('/staffs', staffAuth, this.staffController.getStaffs) //getting details of all staff members
        this.router.patch('/staff/me/:id', adminAuth, this.staffController.updateStaff)  //update data of staff using id
        this.router.delete('/staff/me/:id', adminAuth, this.staffController.deleteStaff)  //delete data of staff using id
        this.router.post('/staff/login', this.staffController.staffLogin) // for login staff
        this.router.post('/staff/logout', staffAuth,this.staffController.staffLogout) //for logout staff
    }
}

export default new StaffRoute().router;

/** 
 * @description export all router to use together
*/
//module.exports = router;