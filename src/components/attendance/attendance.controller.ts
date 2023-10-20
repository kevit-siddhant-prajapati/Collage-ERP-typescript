import { Request, Response } from "express";
const Attendance = require('./attendance.model')
import { staffsLogger } from "../staffs/staffs.logs";
import { studentsLogger } from "../students/students.logs";

class AttendanceController {

    async fillStudentAttendance(req:Request, res:Response){
        try {
            console.log("fillStudentAttendance is call")
            const newAttendance = new Attendance(req.body)
            console.log(req.body)
            try {
                await newAttendance.save()
            } catch (err){
                return res.status(400).send(`Unable to fill student attendance ${err}`)
            }
            res.status(201).send(newAttendance)
        } catch( e ){
            res.status(500).send({error : e})
        }
    }

    async fillStaffAttendance(req:Request, res:Response){
        try {
            //console.log("fillStaffAttendance is call")
            
            const newdate = new Date(req.body.date)
            req.body.date = newdate
            console.log(newdate)
            const newAttendance = new Attendance(req.body)
            //console.log(req.body)
            try {
                await newAttendance.save()
            } catch (err){
                return res.status(400).send(`Unable to fill staff attendance ${err}`)
            }
            res.status(201).send(newAttendance)
        } catch( e ){
            res.status(500).send({error : e})
        }
    }

    async manageStudentAttendance(req:Request, res:Response){
        try {
            const updatable = ['status', 'Role']
            const updateStudentAttendance = Object.keys(req.body)
            const isValidUpdate = updateStudentAttendance.every(update => updatable.includes(update))
            if(!isValidUpdate){
                studentsLogger.error(`Not valid student Attendance update`)
                return res.status(400).send('Not valid update')
            }
            try {
                const studentAttendance = await Attendance.findById(req.params.id)
                if(!studentAttendance){
                    studentsLogger.error(`Unable to find student`)
                    return res.status(404).send('This type of Student not found')
                }
                updateStudentAttendance.forEach(update => {
                    studentAttendance[update] = req.body[update] 
                })
                await studentAttendance.save()
                res.status(200).send(studentAttendance)
                studentsLogger.info(`update data of student attendance ${studentAttendance._id}`)
            } catch( e ){
                return res.status(400).send(e)
            }
        } catch (e){
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    async manageStaffAttendance(req:Request, res:Response){
        try {
            const updatable = ['status', 'Role']
            const updateStaffAttendance = Object.keys(req.body)
            const isValidUpdate = updateStaffAttendance.every(update => updatable.includes(update))
            if(!isValidUpdate){
                staffsLogger.error(`Not valid staff Attendance update`)
                return res.status(400).send('Not valid update')
            }
            try {
                const staffAttendance = await Attendance.findById(req.params.id)
                if(!staffAttendance){
                    staffsLogger.error(`Unable to find staff`)
                    return res.status(404).send('This type of Staff not found')
                }
                updateStaffAttendance.forEach(update => {
                    staffAttendance[update] = req.body[update] 
                })
                await staffAttendance.save()
                res.status(200).send(staffAttendance)
                staffsLogger.info(`update data of student attendance ${staffAttendance._id}`)
            } catch( e ){
                return res.status(400).send(e)
            }
        } catch (e){
            staffsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

export default AttendanceController
