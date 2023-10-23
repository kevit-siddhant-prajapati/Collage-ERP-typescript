import { Request, Response} from "express"
const Admin = require('./admin.model');
import {adminLogger} from "./admin.logs"


class AdminController {
    async addAdmin(req:Request, res:Response){
        try {
            // Validate request data here if needed
            const newAdmin = new Admin(req.body);
            console.log('This is status of student',newAdmin)
            try{
                await newAdmin.save()
            }catch(e){
                adminLogger.error(`Unable to create admin`)
                return res.status(400).send({error : e})
            }
            // Respond with a 201 Created status code and the created student
            const token = await newAdmin.generateAuthToken()
            adminLogger.info(`new admin created ${newAdmin._id}`)
            res.status(201).send({newAdmin, token});
        } catch (err) {
            // Log the error for debugging purposes
            adminLogger.error('Internal Server error')
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async getAdminProfile(req:Request, res:Response){
        try {
            const token = req.header('Authorization').replace('Bearer ','');
            const admin = await Admin.find({'tokens.token':token})
            if(!admin){
                adminLogger.error(`Given ${req.params.id} not exist`)
                return res.status(404).send({error : 'staff not exist'})
            }
            adminLogger.info(`Get admin profile of ${req.params.id}`)
            res.send(admin)   
        } catch (err) {
            // Log the error for debugging purposes
            adminLogger.error('Internal Server error')
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /** 
     * @describe this get method show all staff that are present in the database
    */
    async getAdmins(req:Request, res:Response){
        try {
            const admin = await Admin.find({})
            if(!admin){
                adminLogger.error(`Unable to fetch details of all admins`)
                return res.status(404).send({error : 'staff not exist'})
            }
            adminLogger.info(`Getting data of all admin`)
            res.send(admin)  
        } catch(err){
            // Log the error for debugging purposes
            adminLogger.error('Internal Server error')
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * @description below given router is useful to update details of logged student
     * it takes json object from postman and update student
    */
    async updateAdmin(req:Request, res:Response){
        try {
            const updatable = ['name', 'email', 'password']
            const updateAdmin = Object.keys(req.body)
            const isValidUpdate = updateAdmin.every(update => updatable.includes(update))
            if(!isValidUpdate){
                adminLogger.error('Not valid update for admin')
                return res.status(400).send('Not valid update')
            }
            try {
                const admin = await Admin.findById(req.params.id)
                if(!admin){
                    adminLogger.error(`Unable to find data of ${req.params.id} admin`)
                    return res.status(404).send('This type of Student not found')
                }
                updateAdmin.forEach(update => {
                    admin[update] = req.body[update] 
                })
                await admin.save()
                adminLogger.info(`Admin updated successfully of adminId : ${admin._id}`)
                res.send(admin)
            } catch( e ){
                adminLogger.error('Unable to do update in admin')
                return res.status(400).send(e)
            }
        } catch (err){
            // Log the error for debugging purposes
            adminLogger.error('Internal Server error')
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * @description This below router delete the logged Student
    */
    async deleteAdmin(req:Request, res:Response){
        try {
            const admin = await Admin.findById(req.params.id)
            console.log(req.params.id)
            console.log(admin)
            if(!admin){
                adminLogger.error(`Given admin not exit adminId : ${req.params.id}`)
                return res.status(404).send('Given Student is not exist.')
            }
            await Admin.deleteOne({_id : admin._id})
            adminLogger.info(`Admin deleted successfully of adminId`)
            res.send(admin)
        } catch ( e ){
            // Log the error for debugging purposes
            adminLogger.error('Internal Server error')
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async adminLogin(req:Request, res:Response){
        try {
            console.log('Staff login is call')
            const admin =  await Admin.findByCredentials(req.body.email , req.body.password)
            console.log(admin)
            if(!admin){
                //throw new Error('Invalid username or password')
                return res.status(400).send('Invalid username or password')
            }
            const token = await admin.generateAuthToken()
            res.send({user: admin, token})
        } catch(e){
            return res.status(500).send(`Internal Server Error : ${e}`)
        }
        
    }

    async adminLogout(req, res:Response){
        //console.log('admin controller is working')
        try {
            req.admin.tokens = req.admin.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.admin.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    }
    
}

export default AdminController