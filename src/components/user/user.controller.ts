import { Request, Response} from "express"
const Admin = require('../admins/admin.model')
const Staff = require('../staffs/staffs.model')
const Student = require('../students/students.model')
const studentAuth = require('../../middleware/studentAuth')

class UserController {
    async loginUser(req:Request, res:Response){
        try {
            const userRole = req.body.role;
            if(userRole == "Admin"){
                console.log('Admin is selected')
                const admin =  await Admin.findByCredentials(req.body.email , req.body.password)
                if(!admin){
                    throw new Error('Invalid username or password')
                }
                const token = await admin.generateAuthToken()
                return res.send({user: admin, token})
            } else if (userRole == "Staff"){
                const staff =  await Staff.findByCredentials(req.body.email , req.body.password)
                if(!staff){
                    throw new Error('Invalid username or password')
                }
                const token = await staff.generateAuthToken()
                return res.send({user: staff, token})
            } else if (userRole == "Student"){
                const student =  await Student.findByCredentials(req.body.email , req.body.password)
                if(!student){
                    throw new Error('Invalid username or password')
                }
                const token = await student.generateAuthToken()
                return res.send({user: student, token})
            } else {
                throw new Error("Please select valid role")
            }
        } catch (e){
            // Log the error for debugging purposes
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: ` ${e}` });
        }
    }
}

export default UserController