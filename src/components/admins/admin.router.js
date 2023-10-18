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
 * @description this file contains router for admin
 */
var express_1 = require("express");
var Admin = require('./admin.model');
var admin_logs_1 = require("./admin.logs");
var router = (0, express_1.Router)();
router.post('/admin/signup', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newAdmin, e_1, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                newAdmin = new Admin(req.body);
                console.log('This is status of student', newAdmin);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, newAdmin.save()];
            case 2:
                _a.sent();
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                admin_logs_1.adminLogger.error("Unable to create admin");
                return [2 /*return*/, res.status(400).send({ error: e_1 })];
            case 4:
                // Respond with a 201 Created status code and the created student
                admin_logs_1.adminLogger.info("new admin created ".concat(newAdmin._id));
                res.status(201).send(newAdmin);
                return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                // Log the error for debugging purposes
                admin_logs_1.adminLogger.error('Internal Server error');
                // Respond with a 500 Internal Server Error status code
                res.status(500).send({ error: 'Internal Server Error' });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
router.get('/admin/me/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Admin.find({ _id: req.params.id })];
            case 1:
                admin = _a.sent();
                if (!admin) {
                    admin_logs_1.adminLogger.error("Given ".concat(req.params.id, " not exist"));
                    return [2 /*return*/, res.status(404).send({ error: 'staff not exist' })];
                }
                admin_logs_1.adminLogger.info("Get admin profile of ".concat(req.params.id));
                res.send(admin);
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                // Log the error for debugging purposes
                admin_logs_1.adminLogger.error('Internal Server error');
                // Respond with a 500 Internal Server Error status code
                res.status(500).send({ error: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @describe this get method show all staff that are present in the database
*/
router.get('/admins', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Admin.find({})];
            case 1:
                admin = _a.sent();
                if (!admin) {
                    admin_logs_1.adminLogger.error("Unable to fetch details of all admins");
                    return [2 /*return*/, res.status(404).send({ error: 'staff not exist' })];
                }
                admin_logs_1.adminLogger.info("Getting data of all admin");
                res.send(admin);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                // Log the error for debugging purposes
                admin_logs_1.adminLogger.error('Internal Server error');
                // Respond with a 500 Internal Server Error status code
                res.status(500).send({ error: 'Internal Server Error' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
/**
 * @description below given router is useful to update details of logged student
 * it takes json object from postman and update student
*/
router.patch('/admin/me/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var updatable_1, updateAdmin, isValidUpdate, admin_1, e_2, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 6, , 7]);
                updatable_1 = ['name', 'email', 'password'];
                updateAdmin = Object.keys(req.body);
                isValidUpdate = updateAdmin.every(function (update) { return updatable_1.includes(update); });
                if (!isValidUpdate) {
                    admin_logs_1.adminLogger.error('Not valid update for admin');
                    return [2 /*return*/, res.status(400).send('Not valid update')];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, Admin.findById(req.params.id)];
            case 2:
                admin_1 = _a.sent();
                if (!admin_1) {
                    admin_logs_1.adminLogger.error("Unable to find data of ".concat(req.params.id, " admin"));
                    return [2 /*return*/, res.status(404).send('This type of Student not found')];
                }
                updateAdmin.forEach(function (update) {
                    admin_1[update] = req.body[update];
                });
                return [4 /*yield*/, admin_1.save()];
            case 3:
                _a.sent();
                admin_logs_1.adminLogger.info("Admin updated successfully of adminId : ".concat(admin_1._id));
                res.send(admin_1);
                return [3 /*break*/, 5];
            case 4:
                e_2 = _a.sent();
                admin_logs_1.adminLogger.error('Unable to do update in admin');
                return [2 /*return*/, res.status(400).send(e_2)];
            case 5: return [3 /*break*/, 7];
            case 6:
                err_4 = _a.sent();
                // Log the error for debugging purposes
                admin_logs_1.adminLogger.error('Internal Server error');
                // Respond with a 500 Internal Server Error status code
                res.status(500).send({ error: 'Internal Server Error' });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); });
/**
 * @description This below router delete the logged Student
*/
router.delete('/admin/me/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var admin, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, Admin.findById(req.params.id)];
            case 1:
                admin = _a.sent();
                console.log(req.params.id);
                console.log(admin);
                if (!admin) {
                    admin_logs_1.adminLogger.error("Given admin not exit adminId : ".concat(req.params.id));
                    return [2 /*return*/, res.status(404).send('Given Student is not exist.')];
                }
                return [4 /*yield*/, Admin.deleteOne({ _id: admin._id })];
            case 2:
                _a.sent();
                admin_logs_1.adminLogger.info("Admin deleted successfully of adminId");
                res.send(admin);
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                // Log the error for debugging purposes
                admin_logs_1.adminLogger.error('Internal Server error');
                // Respond with a 500 Internal Server Error status code
                res.status(500).send({ error: 'Internal Server Error' });
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
