/**
 * @description this file contains router for admin
 */
import express from 'express'
import mongoose from 'mongoose';
//const express = require('express');
const Admin = require('../models/admin');

const router = express.Router()


router.post('/admin/signup', async (req, res) => {
    try {
        // Validate request data here if needed
        const {name, email, password, phoneNumber, department, attendance} = req.body;
        const newAdmin = new Admin({
            name,
            email,
            password
        });
        console.log('This is status of student',newAdmin)
        try{
            await newAdmin.save()
        }catch(e){
            res.status(400).send({error : e})
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
router.get('/admin/login', async (req, res) => {
    //console.log(req.params.id)
    const admin = await Admin.find({})
    if(!admin){
        return res.status(404).send({error : 'staff not exist'})
    }
    res.send(admin)    
})

/** 
 * @description this require method import database.js file 
*/
require('../../bin/database')

/** 
 * @description export all router to use together
*/
module.exports = router;