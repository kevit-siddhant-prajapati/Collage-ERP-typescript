import { Request, Response } from "express";
const Attendance = require('./attendance.model')
import { staffsLogger } from "../staffs/staffs.logs";
import { studentsLogger } from "../students/students.logs";
const Student = require('../students/students.model')
const Staff = require('../staffs/staffs.model')

class AttendanceController {

    async fillStudentAttendance(req:Request, res:Response){
        try {
            const attendStudent = req.body.attendance;
    
            for (const attendie of attendStudent) {
                const student = await Student.findById(attendie);
                if (student) {
                    student.attendance += 1;

                    // there is change
                    const attendanceDetail = {
                        status : true,
                        date : req.body.date,
                        userId : student._id,
                        roleOfUser : "Student"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    //there is change
                    //console.log(req.body)
                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill student attendance ${err}`)
                    }
                    // res.status(201).send(newAttendance)

                    await student.save();
                    studentsLogger.info(`Attendance filled : ${student._id}`)
                } 
                const notAttendStudent = await Staff.findById({ $ne :attendie});
                if(notAttendStudent){
                    const attendanceDetail = {
                        status : false,
                        date : req.body.date,
                        userId : notAttendStudent._id,
                        roleOfUser : "Student"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    //there is change
                    //console.log(req.body)
                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill student attendance ${err}`)
                    }
                    //res.status(201).send(newAttendance)
                    await student.save();
                    studentsLogger.info(`Attendance filled : ${notAttendStudent._id}`)
                }
            }
            studentsLogger.info('Filled attendance of given Students')
            res.status(201).send("Filled Attendance of all student")
        } catch( e ){
            res.status(500).send({error : e})
        }
    }

    async fillStaffAttendance(req:Request, res:Response){
        try {
            const attendStaff = req.body.attendance;
    
            for (const attendie of attendStaff) {
                const staff = await Staff.findById(attendie);
                if (staff) {
                    staff.attendance += 1;

                    // there is change
                    const attendanceDetail = {
                        status : true,
                        date : req.body.date,
                        userId : staff._id,
                        roleOfUser : "Staff"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    //there is change
                    //console.log(req.body)
                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill student attendance ${err}`)
                    }
                    // res.status(201).send(newAttendance)

                    await staff.save();
                    staffsLogger.info(`Attendance filled : ${staff._id}`)
                } 
                const notAttendStaff = await Staff.findById({ $ne :attendie});
                if(notAttendStaff){
                    
                    const attendanceDetail = {
                        status : false,
                        date : req.body.date,
                        userId : notAttendStaff._id,
                        roleOfUser : "Staff"
                    }
                    const newAttendance = new Attendance(attendanceDetail)

                    try {
                        await newAttendance.save()
                    } catch (err){
                        return res.status(400).send(`Unable to fill staff attendance ${err}`)
                    }
                    //res.status(201).send(newAttendance)
                    await staff.save();
                    staffsLogger.info(`Attendance filled : ${staff._id}`)
                }
            }
            studentsLogger.info('Filled attendance of given Staffs')
            res.status(201).send("Filled Attendance of all staffs")
        } catch( e ){
            res.status(500).send({error : e})
        }
    }

    async manageStudentAttendance(req:Request, res:Response){
        try {
            const updatable = ['status', 'Role', 'date']
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
            const updatable = ['status', 'Role', 'date']
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
