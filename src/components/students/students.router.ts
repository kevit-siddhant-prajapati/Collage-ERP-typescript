/**
 * @description this routers/students.js file contains routers students
 *  This file import Student models and perform CRUD operation on it
 */
const express = require('express');
const Student = require('./students.model');
const router = express.Router()
//import * as bcrypt from "bcrypt";

/**
 * @description this router create new Student
 * it takes student object from postman and it to database
 */
router.post('/student/signup', async (req, res) => {
    try {
        // Validate request data here if needed
        const {name, email, currentSem, password, phoneNumber, department, batch, attendance} = req.body;
        const newStudent = new Student({
            name,
            email,
            currentSem,
            password ,
            phoneNumber,
            department,
            batch,
            attendance
        });
        console.log('This is status of student',newStudent)
        try{
            await newStudent.save()
        }catch(e:any){
            res.status(400).send({error : e.errors})
        }
        

        // Respond with a 201 Created status code and the created student
        res.status(201).send(newStudent);
    } catch (err) {
        // Log the error for debugging purposes
        console.log(err)

        // Respond with a 500 Internal Server Error status code
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



/**
 * @description this router is used for checking profile of login student
 * according to json web token it take profile of logged student
*/
router.get('/student/me/:id', async (req, res) => {
    //console.log(req.params.id)
    const student = await Student.find({_id : req.params.id})
    if(!student){
        return res.status(404).send({error : 'student not exist'})
    }
    res.send(student)    
})

/**
 * @description below given router show data of all students
*/
router.get('/students', async (req, res) => {
    //console.log(req.params.id)
    const student = await Student.find({})
    if(!student){
        return res.status(404).send({error : 'student not exist'})
    }
    res.send(student)    
})

/**
 * @description below given router is useful to update details of logged student
 * it takes json object from postman and update student
*/
router.patch('/student/me/:id', async (req, res) => {
    const updatable = ['name', 'email', 'currentSem', 'password', 'phoneNumber', 'department', 'batch', 'attendance']
    const updateStudent = Object.keys(req.body)
    const isValidUpdate = updateStudent.every(update => updatable.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('Not valid update')
    }
    try {
        const student = await Student.findById(req.params.id)
        if(!student){
            return res.status(404).send('This type of Student not found')
        }
        updateStudent.forEach(update => {
            student[update] = req.body[update] 
        })
        await student.save()
        res.send(student)
    } catch( e ){
        return res.status(400).send(e)
    }
})

/**
 * @description This below router delete the logged Student
*/
router.delete('/student/me/:id', async(req, res)=>{
    try {
        const student = await Student.findById(req.params.id)
        console.log(req.params.id)
        console.log(student)
        if(!student){
            return res.status(404).send('Given Student is not exist.')
        }
        await Student.deleteOne({_id : student._id})
        res.send(student)
    } catch ( e ){
        res.status(500).send('Something went wrong :( ')
    }
})

/**
 * @description below router is use for fill student attendence
*/
router.patch('/students/attendance', async(req, res) => {
    try {
        const attendStudent = req.body.attendance;

        for (const attendie of attendStudent) {
            const student = await Student.findById(attendie);

            if (student) {
                student.attendance += 1;
                await student.save();
                console.log(attendie);
            } else {
                console.log(`Student with ID ${attendie} not found`);
            }
        }

        res.status(200).send({ message: 'Attendance updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
})

/** 
 * @description this require method import database.js file 
*/
require('../../../bin/database')

/** 
 * @description responsible for running code on the server
*/
module.exports = router; 