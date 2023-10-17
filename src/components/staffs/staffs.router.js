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
 * @description this routers/students.js file contains routers students
 */
var express_1 = require("express");
var Staff = require('./staffs.model');
var router = (0, express_1.Router)();
router.post('/staff/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newStaff, e_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                newStaff = new Staff(req.body);
                console.log('This is status of student', newStaff);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newStaff.save()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                res.status(400).send({ error: e_1 });
                return [3 /*break*/, 4];
            case 4:
                // Respond with a 201 Created status code and the created student
                res.status(201).send(newStaff);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                // Log the error for debugging purposes
                console.log(err_1);
                // Respond with a 500 Internal Server Error status code
                res.status(500).send({ error: 'Internal Server Error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get('/staff/me/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var staff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Staff.find({ _id: req.params.id })];
            case 1:
                staff = _a.sent();
                if (!staff) {
                    return [2 /*return*/, res.status(404).send({ error: 'staff not exist' })];
                }
                res.send(staff);
                return [2 /*return*/];
        }
    });
}); });
/**
 * @describe this get method show all staff that are present in the database
*/
router.get('/staffs', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var staff;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Staff.find({})];
            case 1:
                staff = _a.sent();
                if (!staff) {
                    return [2 /*return*/, res.status(404).send({ error: 'staff not exist' })];
                }
                res.send(staff);
                return [2 /*return*/];
        }
    });
}); });
/**
 * @description below given router is useful to update details of logged staff
 * it takes json object from postman and update staff
*/
router.patch('/staff/me/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatable, updateStaff, isValidUpdate, staff_1, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                updatable = ['name', 'email', 'password', 'phoneNumber', 'department', 'attendance'];
                updateStaff = Object.keys(req.body);
                isValidUpdate = updateStaff.every(function (update) { return updatable.includes(update); });
                if (!isValidUpdate) {
                    return [2 /*return*/, res.status(400).send('Not valid update')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Staff.findById(req.params.id)];
            case 2:
                staff_1 = _a.sent();
                if (!staff_1) {
                    return [2 /*return*/, res.status(404).send('This type of Student not found')];
                }
                updateStaff.forEach(function (update) {
                    staff_1[update] = req.body[update];
                });
                return [4 /*yield*/, staff_1.save()];
            case 3:
                _a.sent();
                res.send(staff_1);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                return [2 /*return*/, res.status(400).send(e_2)];
            case 5: return [2 /*return*/];
        }
    });
}); });
/**
 * @description This below router delete the logged Staff
*/
router.delete('/staff/me/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var staff, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Staff.findById(req.params.id)];
            case 1:
                staff = _a.sent();
                console.log(req.params.id);
                console.log(staff);
                if (!staff) {
                    return [2 /*return*/, res.status(404).send('Given Student is not exist.')];
                }
                return [4 /*yield*/, Staff.deleteOne({ _id: staff._id })];
            case 2:
                _a.sent();
                res.send(staff);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                res.status(500).send('Something went wrong :( ');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * @description this require method import database.js file
*/
require('../../../bin/database');
/**
 * @description export all router to use together
*/
module.exports = router;
