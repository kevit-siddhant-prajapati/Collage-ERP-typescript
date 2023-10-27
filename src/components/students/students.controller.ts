import { Request, Response} from "express";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Student = require('./students.model');
import {studentsLogger} from "../logger"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Attendance = require('../attendance/attendance.model')

class StudentController {
    /**
     * @description below given router show data of all students
    */
    async getStudent(req:Request, res:Response){
        try {
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
            res.status(201).send({newStudent : newStudent, token});
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
            const student = await Student.find({'tokens.token':token},{password : 0 , tokens : 0})
            const authenticatedStudent = student;

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
            if(!student){
                studentsLogger.error(`Requested student not found`)
                return res.status(404).send('Given Student is not exist.')
            }
            await Student.deleteOne({_id : student._id}) // delete student using url parameter
            await Attendance.deleteMany({userId : student._id}) // delete the attendendance that belongs to perticular student
            studentsLogger.info(`Student is deleted ${student._id}`)
            res.status(200).send(student)
        } catch ( e ){
            studentsLogger.error('Internal server error!, unable to connect with application')
            res.status(500).send('Something went wrong :( ')
        }
    }


    /**
     * @description below studentLogout call when student logout from the system
     * req.student - it is the data of authorize student
    */
    async studentLogout(req, res:Response){
        try {
            req.student.tokens = req.student.tokens.filter((token) => {
                return token.token !== req.token
            })
            await req.student.save("Logout successfully")
            res.send()
        } catch (e) {
            res.status(500).send()
        }
    }
    

    /**
     * 
     * @param req - the request coming from student authentication
     * @param res - the responce give back to the browser
     * @returns either student data or error
     */
    async studentLogin(req:Request, res:Response){
        try {
            const student =  await Student.findByCredentials(req.body.email , req.body.password)
        if(!student){
            return res.status(400).send('Invalid username or password')
        }
        const token = await student.generateAuthToken()
        return res.send({user: student.getPublicProfile(), token})
        } catch (e){
            res.status(500).send({error : `Internal Server Error : ${e}`})
        }
    }

    /**
     * @description below given find the analysis 
     *  Analysis : Analytics which gives an idea about the total number of students in a particular 
     *             year and the total number of students in a particular branch for that year
    */
   async studentGroupByYear(req:Request, res:Response){
    try {
        const student = await Student.aggregate([
            // this pipe group the data according to batch the after year
            //totalStudent count the number of student according to year
            {
              $group: {
                _id: {
                  year: "$batch",
                  department: "$department"
                },
                totalStudents: { $sum: 1 }
              }
            },
            //grouping the student further department
            // here k - nameOfDepartment
            // v- total numberOfStudent per department
            {
              $group: {
                _id: "$_id.year",
                totalStudents: { $sum: "$totalStudents" },
                branches: {
                  $push: {
                    k: "$_id.department",
                    v: "$totalStudents"
                  }
                }
              }
            },
            //print only year , totalStudent per year and array of department
            {
              $project: {
                _id: 0,
                year: "$_id",
                totalStudents: 1,
                branches: { $arrayToObject: "$branches" }
              }
            }
        ])
    
        if(!student) {
            studentsLogger.error('Data for analysis 1 not get')
            return res.status(404).send('Data not found');
        }
        res.status(200).send(student)
    } catch (e){
        studentsLogger.error('enable to get Analysis 1 details')
        res.status(500).send('Internal Server Error!')
    }
   }
}

export default StudentController