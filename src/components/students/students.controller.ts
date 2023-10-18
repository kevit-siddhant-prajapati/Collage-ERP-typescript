import { Request, Response} from "express";
const Student = require('./students.model');
import {studentsLogger} from "./students.logs"
// const router = Router()

class StudentController {
    /**
     * @description below given router show data of all students
    */
    async getStudent(req:Request, res:Response){
        try {
            console.log("This is running")
            const student = await Student.find({})
            if(!student){
                studentsLogger.error(`Unable to get data of all students`)
                return res.status(404).send({error : 'student not exist'})
            }
            res.status(200).send(student)
            studentsLogger.info('Fetching data of all students') 
        } catch (e) {
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        } 
    }

    async postStudent(req:Request, res:Response) {
        try {
            // Validate request data here if needed
            
            const newStudent = new Student(req.body);
            try{
                await newStudent.save()
            }catch(e:any){
                studentsLogger.error(`Unable to create student! error=${e}`)
                return res.status(400).send({error : e.errors})
            }
            // Respond with a 201 Created status code and the created student
            studentsLogger.info(`Student created! ${newStudent._id}`)
            res.status(201).send(newStudent);
        } catch (err) {
            // Respond with a 500 Internal Server Error status code
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * @description this router is used for checking profile of login student
     * according to json web token it take profile of logged student
    */
    async getStudentProfile(req:Request, res:Response){
        try {
            const student = await Student.find({_id : req.params.id})
            if(!student){
                studentsLogger.error(`${req.params._id} - this student not found`)
                return res.status(404).send({error : 'student not exist'})
            }
            res.status(200).send(student)  
            studentsLogger.info(`Getting the profile of student ${student._id}`)  
        } catch (error) {
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * @description below given router is useful to update details of logged student
     * it takes json object from postman and update student
    */
    async updateStudent(req:Request, res:Response){
        try {
            const updatable = ['name', 'email', 'currentSem', 'password', 'phoneNumber', 'department', 'batch', 'attendance']
            const updateStudent = Object.keys(req.body)
            const isValidUpdate = updateStudent.every(update => updatable.includes(update))
            if(!isValidUpdate){
                studentsLogger.error(`Not valid student Update`)
                return res.status(400).send('Not valid update')
            }
            try {
                const student = await Student.findById(req.params.id)
                if(!student){
                    studentsLogger.error(`Unable to find student`)
                    return res.status(404).send('This type of Student not found')
                }
                updateStudent.forEach(update => {
                    student[update] = req.body[update] 
                })
                await student.save()
                res.status(200).send(student)
                studentsLogger.info(`update data of student ${student._id}`)
            } catch( e ){
                return res.status(400).send(e)
            }
        } catch (e){
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }

    /**
     * @description This below router delete the logged Student
    */
    async deleteStudent(req:Request, res:Response){
        try {
            const student = await Student.findById(req.params.id)
            console.log(req.params.id)
            console.log(student)
            if(!student){
                studentsLogger.error(`Requested student not found`)
                return res.status(404).send('Given Student is not exist.')
            }
            await Student.deleteOne({_id : student._id})
            studentsLogger.info(`Student is deleted ${student._id}`)
            res.status(200).send(student)
        } catch ( e ){
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send('Something went wrong :( ')
        }
    }

    /**
     * @description below router is use for fill student attendence
    */
    async fillAttendance(req:Request, res:Response) {
        try {
            const attendStudent = req.body.attendance;
    
            for (const attendie of attendStudent) {
                const student = await Student.findById(attendie);
                if (student) {
                    student.attendance += 1;
                    await student.save();
                    studentsLogger.info(`Attendance filled : ${student._id}`)
                } else {
                    studentsLogger.error(`Unable to fill attendance of requested students!`)
                    return res.status(400).send()
                }
            }
            studentsLogger.info(`data of student attendance updated`)
            res.status(200).send({ message: 'Attendance updated successfully' });
        } catch (error) {
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
}

export default StudentController