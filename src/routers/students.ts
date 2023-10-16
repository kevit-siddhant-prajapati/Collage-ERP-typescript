/**
 * @description this routers/students.js file contains routers students
 *  This file import Student models and perform CRUD operation on it
 */
const express = require('express');
const Student = require('../models/students');
const router = express.Router()


router.post('/students', async (req, res) => {
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

/**
 * @description this router is used for checking profile of login student
 * according to json web token it take profile of logged student
*/
router.get('/student/me/:id', async (req, res) => {
    //console.log(req.params.id)
    console.log('find new Student')
    const student = await Student.find({_id : req.params.id})
    if(!student){
        return res.status(404).send({error : 'student not exist'})
    }
    res.send(student)    
})

router.get('/student', async (req, res) => {
    //console.log(req.params.id)
    console.log('find all students')
    const student = await Student.find({})
    if(!student){
        return res.status(404).send({error : 'student not exist'})
    }
    res.send(student)    
})

router.patch('/student/me', async (req, res) => {

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