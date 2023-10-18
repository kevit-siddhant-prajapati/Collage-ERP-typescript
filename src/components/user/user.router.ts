import {Router} from "express"
require('../../../bin/database')
import UserController from "./user.controller"

class UserRoute {
    public router:Router = Router()

    private userController:UserController = new UserController()

    constructor(){
        this.router = Router()
        this.initializeRoutes()
    }

    initializeRoutes():void {
        this.router.post('/login', this.userController.loginUser)
    }
}

export default new UserRoute().router
