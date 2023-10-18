/**
 * @description this file contains router for admin
 */
import { Router} from "express"
require('../../../bin/database')
import AdminController from "./admin.controller";

class AdminRoute {

    public router:Router = Router()

    private adminController:AdminController = new AdminController()

    constructor(){
        this.router = Router()
        this.initializeRoutes()
    }

    initializeRoutes():void {
        this.router.post('/admin/signup', this.adminController.addAdmin)
        this.router.get('/admin/me/:id', this.adminController.getAdminProfile)
        this.router.get('/admins', this.adminController.getAdmins)
        this.router.patch('/admin/me/:id', this.adminController.updateAdmin)
        this.router.delete('/admin/me/:id', this.adminController.deleteAdmin)
    }
}

export default new AdminRoute().router;
