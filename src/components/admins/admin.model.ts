/** 
 * @description this file contains adminSchema and model of admin
*/

import * as mongoose from "mongoose"
const validator = require("validator")
const Schema = mongoose.Schema;
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"

/** 
 * @description staffSchema that contain property
 * @param name:String   -contain name of the staff     property-required
 * @param phoneNo:number     property- default:null
 * @param department:String   value-Branch of staff     property- must in [CE, EC, ME]
 * @param attendence:number value-total number of attendence         
 * @param email:string         property-required 
*/

interface IAdmin{
    name:string,
    email:string,
    password:string,
    tokens : Array<string>
}

const adminSchema = new Schema<IAdmin>({
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
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
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

adminSchema.statics.findByCredentials = async (email:string, password:string) => {
    const admin = await Admin.findOne({email})
    console.log(`email : ${email} & password : ${password}`)
    if(!admin){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, admin.password)
    if(!isMatch){
        throw new Error('Password is incorrect')
    }
    return admin
  }

adminSchema.methods.generateAuthToken = async function(){
    const admin = this
    const token = jwt.sign({_id : admin._id.toString()}, "secreteJwtToken")
    admin.tokens = admin.tokens.concat({token})
    await admin.save()
    return token
}

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);
module.exports = Admin;
