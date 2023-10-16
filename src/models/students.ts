"use strict";
/**
 * @description this file contains studentSchema
*/
// Object.defineProperty(exports, "__esModule", { value: true });
import mongoose from "mongoose"
import validator from "validator"
const Schema = mongoose.Schema;
import * as bcrypt from "bcrypt";
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
var studentSchema = new Schema({
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
    department: {
        type: String,
        require: true,
        validate: function (value:string) {
            var Branch = ['CE', 'ME', 'EC'];
            if (!Branch.includes(value)) {
                throw new Error('Branch must in CE, ME and EC');
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
    }
});

studentSchema.pre('save', async function (next) {
    const student = this;
    try {
        if (student.isModified('password')) {
            const hashedpassword = await bcrypt.hash(student.password, 8);
            student.password = hashedpassword.toString();
        }
        next();
    } catch (error) {
        next(error);
    }
});


const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
// const student = new Student({
//     name : 'Siddhant',
//     email : 'siddhant@example.com',
//     currentSem : 4,
//     password : 'Sid@1234',
//     phoneNumber : 1234567890,
//     department : 'CE',
//     batch : 2020,
//     attendance : 210
// })
// student.save()
// console.log(student)
