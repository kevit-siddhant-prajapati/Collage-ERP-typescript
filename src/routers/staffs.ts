/**
 * @description this routers/students.js file contains routers students
 */
const express = require('express');
const Staff = require('../models/staffs');

const router = express.Router()


router.post('/staffs', async (req, res) => {
    try {
        // Validate request data here if needed
        const {name, email, password, phoneNumber, department, attendance} = req.body;
        const newStaff = new Staff({
            name,
            email,
            password,
            phoneNumber,
            department,
            attendance
        });
        console.log('This is status of student',newStaff)
        try{
            await newStaff.save()
        }catch(e){
            res.status(400).send({error : e})
        }
        
        // Respond with a 201 Created status code and the created student
        res.status(201).send(newStaff);
    } catch (err) {
        // Log the error for debugging purposes
        console.log(err)

        // Respond with a 500 Internal Server Error status code
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/staff/me/:id', async (req, res) => {
    //console.log(req.params.id)
    const staff = await Staff.find({_id : req.params.id})
    if(!staff){
        return res.status(404).send({error : 'staff not exist'})
    }
    res.send(staff)    
})

/** 
 * @describe this get method show all staff that are present in the database
*/
router.get('/staffs', async (req, res) => {
    //console.log(req.params.id)
    const staff = await Staff.find({})
    if(!staff){
        return res.status(404).send({error : 'staff not exist'})
    }
    res.send(staff)    
})

/** 
 * @description this require method import database.js file 
*/
require('../../bin/database')

/** 
 * @description export all router to use together
*/
module.exports = router;