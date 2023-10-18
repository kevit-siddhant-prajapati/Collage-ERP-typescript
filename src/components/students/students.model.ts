"use strict";
/**
 * @description this file contains studentSchema
*/
// Object.defineProperty(exports, "__esModule", { value: true });
import mongoose from "mongoose"
import validator from "validator"
const Schema = mongoose.Schema;
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
/**
 * @description studentSchema that contain property
 * @param name:String   -contain name of the student     property-required
 * @param phoneNo:number     property- default:null
 * @param department:String   value-Branch of students     property- must in [CE, EC, ME]
 * @param batch:number     value-admission year of student     property-required
 * @param currentSem:number   value-current semester of student       property-must between 1 to 8
 * @param attendence:number value-total number of attendence
 * @param email:string         property-required
*/

interface IStudent {
    name:string,
    email:string,
    currentSem:number,
    password:string,
    phoneNumber : string,
    batch : number,
    attendance : number,
    tokens : Array<string>
}

const studentSchema = new Schema<IStudent>({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: function (value:string) {
            if (value == null) {
                throw new Error('Name is required');
            }
        }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: function (value:string) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    currentSem: {
        type: Number,
        default: 0,
        validate: function (value:number) {
            if (value < 0 && value >= 8) {
                throw new Error('This current Sem is not available');
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        validate: async function (value:string) {
            value = value.trim();
            if (value.toLowerCase() == 'password') {
                throw new Error('Password must not contain string "password"');
            }
            //value = await bcrypt.hash(value, 8)
        }
    },
    phoneNumber: {
        type: String,
        validate: function (value:string) {
            if (value.length != 10) {
                throw new Error('Please insert right phoneNumber');
            }
        }
    },
    batch: {
        type: Number,
        require: true,
        validate: function (value:number) {
            if (value < 2000 || value > 3000) {
                throw new Error('Enter valid batch');
            }
        }
    },
    attendance: {
        type: Number,
        require: true
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]

    }
    );

studentSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const student = this;
    try {
        
        if (student.isModified('password')) {
            const hashedpassword = await bcrypt.hash(student.password, 8);
            student.password = hashedpassword.toString();
            console.log(student.password)
        }
        next();
    } catch (error) {
        next(error);
    }
});

studentSchema.methods.generateAuthToken = async function(){
    const student = this
    const token = jwt.sign({_id : student._id.toString()}, "secreteJwtToken")
    student.tokens = student.tokens.concat({token})
    await student.save()
    return token
}

studentSchema.statics.findByCredentials = async (email:string, password:string) => {
    const student = await Student.findOne({email})

    if(!student){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, student.password)
    if(!isMatch){
        throw new Error('Password is incorrect')
    }
    return student
  }

const Student = mongoose.model<IStudent>('Student', studentSchema);
module.exports = Student;
