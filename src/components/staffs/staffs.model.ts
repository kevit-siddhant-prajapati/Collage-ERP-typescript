/** 
 * @description this file contains staffSchema
*/
import mongoose  from "mongoose";
import * as bcrypt from "bcrypt"
const validator = require('validator');
const Schema = mongoose.Schema;
import * as jwt from "jsonwebtoken"

/** 
 * @description staffSchema that contain property
 * @param name:String   -contain name of the staff     property-required
 * @param phoneNo:number     property- default:null
 * @param department:String   value-Branch of staff     property- must in [CE, EC, ME]
 * @param attendence:number value-total number of attendence         
 * @param email:string         property-required 
*/

interface IStaff {
    name:string,
    email:string,
    password:string,
    phoneNumber:string,
    attendance:number,
    tokens : Array<string>
}

const staffSchema = new Schema<IStaff>({
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
    },
    attendance : {
        type : Number,
        require : true
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
})

staffSchema.pre('save', async function(next){
    const staff = this
    try {
        if(staff.isModified('password')){
            const hashedpassword = await bcrypt.hash(staff.password , 8)
            staff.password = hashedpassword.toString()
        }
        next()
    } catch (e){
        next(e);
    }
})

staffSchema.methods.generateAuthToken = async function(){
    const staff = this
    const token = jwt.sign({_id : staff._id.toString()}, "secreteJwtToken")
    staff.tokens = staff.tokens.concat({token})
    await staff.save()
    return token
}

staffSchema.statics.findByCredentials = async (email:string, password:string) => {
    const staff = await Staff.findOne({email})

    if(!staff){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, staff.password)
    if(!isMatch){
        throw new Error('Password is incorrect')
    }
    return staff
  }

const Staff = mongoose.model<IStaff>('Staff', staffSchema);
module.exports = Staff;
