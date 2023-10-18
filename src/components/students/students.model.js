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
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
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
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
studentSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var student, hashedpassword, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    student = this;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    if (!student.isModified('password')) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt.hash(student.password, 8)];
                case 2:
                    hashedpassword = _a.sent();
                    student.password = hashedpassword.toString();
                    console.log(student.password);
                    _a.label = 3;
                case 3:
                    next();
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    next(error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
});
studentSchema.methods.generateAuthToken = function () {
    return __awaiter(this, void 0, void 0, function () {
        var student, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    student = this;
                    token = jwt.sign({ _id: student._id.toString() }, "secreteJwtToken");
                    student.tokens = student.tokens.concat({ token: token });
                    return [4 /*yield*/, student.save()];
                case 1:
                    _a.sent();
                    return [2 /*return*/, token];
            }
        });
    });
};
studentSchema.statics.findByCredentials = function (email, password) { return __awaiter(void 0, void 0, void 0, function () {
    var student, isMatch;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Student.findOne({ email: email })];
            case 1:
                student = _a.sent();
                if (!student) {
                    throw new Error('Unable to login');
                }
                return [4 /*yield*/, bcrypt.compare(password, student.password)];
            case 2:
                isMatch = _a.sent();
                if (!isMatch) {
                    throw new Error('Password is incorrect');
                }
                return [2 /*return*/, student];
        }
    });
}); };
var Student = mongoose_1.default.model('Student', studentSchema);
module.exports = Student;
