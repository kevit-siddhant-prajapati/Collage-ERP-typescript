/**
 * @description this routers/students.js file contains routers students
 */
import { Router, Request, Response} from "express"
const Staff = require('./staffs.model');
const router = Router()
import { staffsLogger } from "./staffs.logs";

router.post('/staff/signup', async (req:Request, res:Response) => {
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
        staffsLogger.info(`New staff : ${newStaff._id}`)
        res.status(201).send(newStaff);
    } catch (err) {
        // Log the error for debugging purposes
        staffsLogger.error(`Unable connect with server`)
        // Respond with a 500 Internal Server Error status code
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/staff/me/:id', async (req:Request, res: Response) => {
    try {
        const staff = await Staff.find({_id : req.params.id})
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
})

/** 
 * @describe this get method show all staff that are present in the database
*/
router.get('/staffs', async (req:Request, res:Response) => {
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
})

/**
 * @description below given router is useful to update details of logged staff
 * it takes json object from postman and update staff
*/
router.patch('/staff/me/:id', async (req:Request, res:Response) => {
    try {
        const updatable = ['name', 'email', 'password', 'phoneNumber', 'department', 'attendance']
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
})

/**
 * @description This below router delete the logged Staff
*/
router.delete('/staff/me/:id', async(req:Request, res:Response)=>{
    try {
        const staff = await Staff.findById(req.params.id)
        console.log(req.params.id)
        console.log(staff)
        if(!staff){
            staffsLogger.error(`Unable to Find Staff of id : ${req.params.id}`)
            return res.status(404).send('Given Student is not exist.')
        }
        await Staff.deleteOne({_id : staff._id})
        staffsLogger.info(`Staff deleted successfully of id : ${req.params.id}`)
        res.send(staff)
    } catch ( e ){
        // Log the error for debugging purposes
        staffsLogger.error(`Unable connect with server`)
        // Respond with a 500 Internal Server Error status code
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

/** 
 * @description this require method import database.js file 
*/
require('../../../bin/database')

/** 
 * @description export all router to use together
*/
module.exports = router;