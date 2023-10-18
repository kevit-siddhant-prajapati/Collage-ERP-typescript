/**
 * @description this routers/students.js file contains routers students
 */
import { Router} from "express"
require('../../../bin/database')
import StaffController from "./staffs.controller";

class StaffRoute {

    public router: Router = Router();

    private staffController: StaffController = new StaffController();

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    initializeRoutes():void {
        this.router.post('/staff/signup', this.staffController.postStaff)
        this.router.get('/staff/me/:id', this.staffController.getStaffProfile)
        this.router.get('/staffs', this.staffController.getStaffs)
        this.router.patch('/staff/me/:id', this.staffController.updateStaff)
        this.router.delete('/staff/me/:id', this.staffController.deleteStaff)
    }
}

export default new StaffRoute().router;

/** 
 * @description export all router to use together
*/
//module.exports = router;