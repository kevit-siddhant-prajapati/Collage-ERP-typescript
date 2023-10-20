/**
 * @description this file contains router for admin
 */
import { Router} from "express"
require('../../../bin/database')
import AdminController from "./admin.controller";
import adminAuth from "../../middleware/adminAuth";

class AdminRoute {

    public router:Router = Router()

    private adminController:AdminController = new AdminController()

    constructor(){
        this.router = Router()
        this.initializeRoutes()
    }

    initializeRoutes():void {
        this.router.post('/admin/signup', adminAuth, this.adminController.addAdmin)
        this.router.get('/admin/me', adminAuth, this.adminController.getAdminProfile)
        this.router.get('/admins', adminAuth, this.adminController.getAdmins)
        this.router.patch('/admin/me/:id', adminAuth, this.adminController.updateAdmin)
        this.router.delete('/admin/me/:id', adminAuth, this.adminController.deleteAdmin)
        this.router.post('/admin/login', this.adminController.adminLogin)
    }
}

export default new AdminRoute().router;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTMwZDMwNDc0NWI4ODRlOWJiM2EzYmUiLCJpYXQiOjE2OTc3MTMyNTJ9.keLb6J4JmNwbjANbi_Yq_Vz8QIj6Hlsi45Xayyo-BME