/**
 * @description this file contains staffSchema
*/
var mongoose = require('mongoose');
var validator = require('validator');
var Schema = mongoose.Schema;
/**
 * @description staffSchema that contain property
 * @param name:String   -contain name of the staff     property-required
 * @param phoneNo:number     property- default:null
 * @param department:String   value-Branch of staff     property- must in [CE, EC, ME]
 * @param attendence:number value-total number of attendence
 * @param email:string         property-required
*/
var staffSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate: function (value) {
            if (value == null) {
                throw new Error('Name is required');
            }
        }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: function (value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        validate: function (value) {
            value = value.trim();
            if (value.toLowerCase() == 'password') {
                throw new Error('Password must not contain string "password"');
            }
        }
    },
    phoneNumber: {
        type: String,
        validate: function (value) {
            if (value.length != 10) {
                throw new Error('Please insert right phoneNumber');
            }
        }
    },
    department: {
        type: String,
        require: true,
        validate: function (value) {
            var Branch = ['CE', 'ME', 'EC'];
            if (!Branch.includes(value)) {
                throw new Error('Branch must in CE, ME and EC');
            }
        }
    },
    attendance: {
        type: Number,
        require: true
    }
});
var Staff = mongoose.model('Staff', staffSchema);
module.exports = Staff;
