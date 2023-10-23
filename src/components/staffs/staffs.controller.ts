import { Request, Response} from "express"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Staff = require('./staffs.model');
import { staffsLogger } from "./staffs.logs";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Attendance = require('../attendance/attendance.model')
class staffController {

    /**
     * 
     * @param req - Request coming from postman or other frameworks
     * @param res - it response back to data of staff if all correct else error
     */
    async postStaff(req:Request, res:Response) {
        try {
            // Validate request data here if needed
            const newStaff = new Staff(req.body);
            console.log('This is status of student',newStaff)
            try{
                await newStaff.save()
            }catch(e){
                staffsLogger.error(`Unable to add new staff`)
                res.status(400).send({error : e})
            }
            // Respond with a 201 Created status code and the created student
            const token = await newStaff.generateAuthToken()
            staffsLogger.info(`New staff : ${newStaff._id}`)
            res.status(201).send({newStaff, token});
        } catch (err) {
            // Log the error for debugging purposes
            staffsLogger.error(`Unable connect with server`)
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @param req - data of staff that is authenticated
     * @param res - response back data of staff
     * @returns staff object it all correct else error
     */
    async getStaffProfile(req:Request, res: Response) {
        try {
            const token = req.header('Authorization').replace('Bearer ','');
            const staff = await Staff.find({'tokens.token':token})
            if(!staff){
                return res.status(404).send({error : 'staff not exist'})
            }
            res.send(staff) 
        } catch (err){
            // Log the error for debugging purposes
            staffsLogger.error(`Unable connect with server`)
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /** 
     * @describe this get method show all staff that are present in the database
    */
    async getStaffs(req:Request, res:Response){
        try {
            const staff = await Staff.find({})
            if(!staff){
                return res.status(404).send({error : 'staff not exist'})
            }
            res.send(staff)
            staffsLogger.info(`Get details of all staff`)
        } catch (err){
            // Log the error for debugging purposes
            staffsLogger.error(`Unable connect with server`)
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * @description below given router is useful to update details of logged staff
     * it takes json object from postman and update staff
    */
    async updateStaff(req:Request, res:Response){
        try {
            const updatable = ['name', 'email', 'password', 'phoneNumber', 'attendance', 'department']
            const updateStaff = Object.keys(req.body)
            const isValidUpdate = updateStaff.every(update => updatable.includes(update))
            if(!isValidUpdate){
                staffsLogger.info('Not valid request for staff')
                return res.status(400).send('Not valid update')
            }
            const staff = await Staff.findById(req.params.id)
            if(!staff){
                staffsLogger.error(`Unable to Find Staff of id : ${req.params.id}`)
                return res.status(404).send('This type of Student not found')
            }
            updateStaff.forEach(update => {
                staff[update] = req.body[update] 
            })
            await staff.save()
            staffsLogger.info(`Updated Successfuly! staff : ${staff._id}`)
            res.send(staff)
        } catch( e ){
            // Log the error for debugging purposes
            staffsLogger.error(`Unable connect with server`)
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * @description This below router delete the logged Staff
    */
    async deleteStaff(req:Request, res:Response){
        try {
            const staff = await Staff.findById(req.params.id)
            console.log(req.params.id)
            console.log(staff)
            if(!staff){
                staffsLogger.error(`Unable to Find Staff of id : ${req.params.id}`)
                return res.status(404).send('Given Student is not exist.')
            }
            await Staff.deleteOne({_id : staff._id})  //delete data of staff from staff collection
            await Attendance.deleteMany({userId : staff._id}) //delete all attendance of that perticular staff
            staffsLogger.info(`Staff deleted successfully of id : ${req.params.id}`)
            res.send(staff)
        } catch ( e ){
            // Log the error for debugging purposes
            staffsLogger.error(`Unable connect with server`)
            // Respond with a 500 Internal Server Error status code
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * 
     * @param req - contain email and password
     * @param res - data of staff if all correct or error
     * @returns staff Object
     */
    async staffLogin(req:Request, res:Response){
        try {
            console.log('Staff login is call')
            const staff =  await Staff.findByCredentials(req.body.email , req.body.password)
            console.log(staff)
            if(!staff){
                //throw new Error('Invalid username or password')
                return res.status(500).send(`'Invalid username or password'`)
            }
            const token = await staff.generateAuthToken()
            return res.send({user: staff, token})
        }
        catch(e){
            return res.status(500).send(`Internal Server error ${e}`)
        }
    }

    /**
     * 
     * @param req - data of authenticaticated staff
     * @param res - data of logout staff
     */
    async staffLogout(req, res:Response){
        try {
            req.staff.tokens = req.staff.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.staff.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    }
}

export default staffController