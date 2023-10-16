/**
 * @description this routers/students.js file contains routers students
 */
const express = require('express');
const Student = require('../models/students');

const router = express.Router()

/**
 * @description this router use to create new user
 *  method-post   
 *  @param req : this pass data of 
 */
router.post('/student/signup', async (req, res) => {
    console.log('New student created')
    try {
        // Validate request data here if needed
        const {name, email, currentSem, password, phoneNumber, department, batch, attendance} = req.body;
        const newStudent = new Student({
            name,
            email,
            currentSem,
            password,
            phoneNumber,
            department,
            batch,
            attendance
        });
        console.log('This is status of student',newStudent)
        try{
            await newStudent.save()
        }catch(e){
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

router.get('/student/me/:id', async (req, res) => {
    //console.log(req.params.id)
    console.log('find new Student')
    const student = await Student.find({_id : req.params.id})
    if(!student){
        return res.status(404).send({error : 'student not exist'})
    }
    res.send(student)    
})

router.get('/students', async (req, res) => {
    //console.log(req.params.id)
    console.log('find all students')
    const student = await Student.find({})
    if(!student){
        return res.status(404).send({error : 'student not exist'})
    }
    res.send(student)    
})

router.patch('/student/update', async (req, res) => {
    
})
/** 
 * @description this require method import database.js file 
*/
require('../../bin/database')

console.log('Connect with student router')
/** 
 * @description responsible for running code on the server
*/
module.exports = router; 