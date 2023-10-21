import { Request, Response} from "express";
const Student = require('./students.model');
import {studentsLogger} from "./students.logs"
const studentAuth = require('../../middleware/studentAuth')

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

    /**
     * @description below given router is use to create new student
     * it takes data from request and into database
    */
    async postStudent(req:Request, res:Response) {
        try {
            // Validate request data here if needed
            const newStudent = new Student(req.body);
            try{
                await newStudent.save()
            }catch(e){
                studentsLogger.error(`Unable to create student! error=${e}`)
                return res.status(400).send({error : e.errors})
            }
            // Respond with a 201 Created status code and the created student
            const token = await newStudent.generateAuthToken()
            studentsLogger.info(`Student created! ${newStudent._id}`)
            res.status(201).send({newStudent, token});
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
            const token = req.header('Authorization').replace('Bearer ','');
            //console.log(token)
            const student = await Student.find({'tokens.token':token})
            const authenticatedStudent = student;

            console.log(authenticatedStudent); // Print authenticated student data

            // You may want to use the authenticated student data to retrieve the profile
            // For example, if the student ID is in authenticatedStudent._id
            // const studentProfile = await Student.findById(authenticatedStudent._id);

            // Send the student profile as the response
            res.status(200).send(authenticatedStudent);

            // Log information about getting the student profile
            studentsLogger.info(`Getting the profile of student ${authenticatedStudent._id}`); 
        } catch (error) {
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send({ error: `Internal Server Error ${error}`});
        }
    }

    /**
     * @description below given router is useful to update details of logged student
     * it takes json object from postman and update student
    */
    async updateStudent(req:Request, res:Response){
        try {
            const updatable = ['name', 'email', 'currentSem', 'password', 'phoneNumber', 'batch', 'attendance', 'department']
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

    async studentLogout(req, res:Response){
        try {
            req.student.tokens = req.student.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.student.save()
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    }
    

    async studentLogin(req:Request, res:Response){
        const student =  await Student.findByCredentials(req.body.email , req.body.password)
        if(!student){
            throw new Error('Invalid username or password')
        }
        const token = await student.generateAuthToken()
        return res.send({user: student, token})
    }
}

export default StudentController