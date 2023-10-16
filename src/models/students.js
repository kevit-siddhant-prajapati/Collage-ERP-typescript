"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description this file contains studentSchema
*/
// Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var validator_1 = require("validator");
var Schema = mongoose_1.default.Schema;
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
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    currentSem: {
        type: Number,
        default: 0,
        validate: function (value) {
            if (value < 0 && value >= 8) {
                throw new Error('This current Sem is not available');
            }
        }
    },
    password: {
        type: String,
        require: true,
        minlength: 7,
        validate: function (value) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    value = value.trim();
                    if (value.toLowerCase() == 'password') {
                        throw new Error('Password must not contain string "password"');
                    }
                    return [2 /*return*/];
                });
            });
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
    batch: {
        type: Number,
        require: true,
        validate: function (value) {
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
// studentSchema.pre('save', async function (next) {
//     const student = this;
//     try {
//         if (student.isModified('password')) {
//             const hashedpassword = await bcrypt.hash(student.password, 8);
//             student.password = hashedpassword.toString();
//         }
//         next();
//     } catch (error) {
//         next(error);
//     }
// });
var Student = mongoose_1.default.model('Student', studentSchema);
module.exports = Student;
