/**
 * @description this file contains router for admin
 */
import * as express from 'express'
import mongoose from 'mongoose';
//const express = require('express');
const Admin = require('./admin.model');

const router = express.Router()


router.post('/admin/signup', async (req, res) => {
    try {
        // Validate request data here if needed
        const {name, email, password} = req.body;
        const newAdmin = new Admin({
            name,
            email,
            password
        });
        console.log('This is status of student',newAdmin)
        try{
            await newAdmin.save()
        }catch(e){
            return res.status(400).send({error : e})
        }
        
        // Respond with a 201 Created status code and the created student
        res.status(201).send(newAdmin);
    } catch (err) {
        // Log the error for debugging purposes
        console.log(err)

        // Respond with a 500 Internal Server Error status code
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

router.get('/admin/me/:id', async (req, res) => {
    //console.log(req.params.id)
    const admin = await Admin.find({_id : req.params.id})
    if(!admin){
        return res.status(404).send({error : 'staff not exist'})
    }
    res.send(admin)    
})

/** 
 * @describe this get method show all staff that are present in the database
*/
router.get('/admins', async (req, res) => {
    //console.log(req.params.id)
    const admin = await Admin.find({})
    if(!admin){
        return res.status(404).send({error : 'staff not exist'})
    }
    res.send(admin)    
})



/**
 * @description below given router is useful to update details of logged student
 * it takes json object from postman and update student
*/
router.patch('/admin/me/:id', async (req, res) => {
    const updatable = ['name', 'email', 'password']
    const updateAdmin = Object.keys(req.body)
    const isValidUpdate = updateAdmin.every(update => updatable.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('Not valid update')
    }
    try {
        const admin = await Admin.findById(req.params.id)
        if(!admin){
            return res.status(404).send('This type of Student not found')
        }
        updateAdmin.forEach(update => {
            admin[update] = req.body[update] 
        })
        await admin.save()
        res.send(admin)
    } catch( e ){
        return res.status(400).send(e)
    }
})

/**
 * @description This below router delete the logged Student
*/
router.delete('/admin/me/:id', async(req, res)=>{
    try {
        const admin = await Admin.findById(req.params.id)
        console.log(req.params.id)
        console.log(admin)
        if(!admin){
            return res.status(404).send('Given Student is not exist.')
        }
        await Admin.deleteOne({_id : admin._id})
        res.send(admin)
    } catch ( e ){
        res.status(500).send('Something went wrong :( ')
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