/** 
 * @description this file contains adminSchema and model of admin
*/

import * as mongoose from "mongoose"
const validator = require("validator")
const Schema = mongoose.Schema;
import * as bcrypt from "bcrypt"

/** 
 * @description staffSchema that contain property
 * @param name:String   -contain name of the staff     property-required
 * @param phoneNo:number     property- default:null
 * @param department:String   value-Branch of staff     property- must in [CE, EC, ME]
 * @param attendence:number value-total number of attendence         
 * @param email:string         property-required 
*/
const adminSchema = new Schema({
    name : {
        type : String,
        required: true,
        trim : true,
        validate(value:string){
            if(value == null){
                throw new Error('Name is required')
            }
        }
    },
    email : {
        type : String,
        require: true,
        unique :true,
        validate(value:string){
            if(!validator.isEmail(value)){
                throw new Error('Email is invalid')
            }
        }
    },
    password : {
        type : String,
        require : true,
        minlength : 7,
        validate(value:string){
            value = value.trim()
            if(value.toLowerCase() == 'password'){
                throw new Error('Password must not contain string "password"')
            }
        }
    },
    phoneNumber : {
        type : String,
        validate(value:string){
            if(value.length != 10){
                throw new Error('Please insert right phoneNumber')
            }
        }
    }
})

adminSchema.pre('save', async function(next){
    const admin = this
    try {
        if(admin.isModified('password')){
            const hashedpassword = await bcrypt.hash(admin.password , 8)
            admin.password = hashedpassword.toString()
        }
        next()
    } catch (e:any){
        next(e);
    }
})

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
