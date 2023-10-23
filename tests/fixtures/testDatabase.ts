/* eslint-disable @typescript-eslint/no-var-requires */
// const User = require('../../src/models/user')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Student = require('../../src/components/students/students.model')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Staff = require('../../src/components/staffs/staffs.model')
const Admin = require('../../src/components/admins/admin.model')
const secret = process.env.JWT_SECRET_CODE || 'secreteJwtToken'
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const Attendance = require('../../src/components/attendance/attendance.model')

const studentOneId = new mongoose.Types.ObjectId()
const studentOne = {
    _id : studentOneId,
    name : 'Mike',
    email: 'mike@example.com',
    password : 'Mike@1234',
    phoneNumber : 1234567890,
    department : 'CE',
    batch : 2020,
    currentSem : 1,
    attendance : 120,
    tokens : [{
        token : jwt.sign({_id : studentOneId}, secret)
    }]
}

const studentTwoId = new mongoose.Types.ObjectId()
const studentTwo = {
    _id : studentTwoId,
    name : 'John',
    email: 'john@example.com',
    password : 'John@1234',
    phoneNumber : 9087654321,
    department : 'EC',
    batch : 2020,
    currentSem : 1,
    attendance : 150,
    tokens : [{
        token : jwt.sign({_id : studentTwoId}, secret)
    }]
}

const studentThreeId = new mongoose.Types.ObjectId()
const studentThree = {
    _id : studentThreeId,
    name : 'Miyan',
    email: 'miyan@example.com',
    password : 'Miyan@123',
    phoneNumber : 9087659321,
    department : 'ME',
    batch : 2021,
    currentSem : 1,
    attendance : 150,
    tokens : [{
        token : jwt.sign({_id : studentThreeId}, secret)
    }]
}

const staffOneId = new mongoose.Types.ObjectId()
const staffOne = {
    _id : staffOneId,
    name : 'Kristi',
    email : 'kristi@example.com',
    password : 'Kristi@12',
    phoneNumber : 8857343123,
    attendance : 142,
    tokens : [{
        token : jwt.sign({_id : staffOneId}, secret)
    }]
}

const staffTwoId = new mongoose.Types.ObjectId()
const staffTwo = {
    _id : staffTwoId,
    name : 'Linda',
    email : 'linda@example.com',
    password : 'Linda@12',
    phoneNumber : 9857343123,
    attendance : 140,
    tokens : [{
        token : jwt.sign({_id : staffTwoId}, secret)
    }]
}

const adminOneId = new mongoose.Types.ObjectId()
const adminOne = {
    _id : adminOneId,
    name : 'Sima',
    email : 'sima@example.com',
    password : 'Sima@1234',
    tokens : [{
        token : jwt.sign({_id : adminOneId}, secret)
    }]
}

const attendanceOne = {
    _id : new mongoose.Types.ObjectId(),
    date : '2020-12-18',
    status : true,
    roleOfUser : 'Student',
    userId : studentOne._id
}

const attendanceTwo = {
    _id : new mongoose.Types.ObjectId(),
    date : '2020-12-18',
    status : false,
    roleOfUser : 'Student',
    userId : studentTwo._id
}

const attendanceThree = {
    _id : new mongoose.Types.ObjectId(),
    date : '2020-12-18',
    status : true,
    roleOfUser : 'Student',
    userId : studentThree._id
}

const attendanceFour = {
    _id : new mongoose.Types.ObjectId(),
    date : '2020-12-18',
    status : false,
    roleOfUser : 'Student',
    userId : staffOne._id
}

const attendanceFive = {
    _id : new mongoose.Types.ObjectId(),
    date : '2020-12-18',
    status : true,
    roleOfUser : 'Student',
    userId : staffTwo._id
}
const setupDatabase = async () => {
    await Student.deleteMany()
    await Staff.deleteMany()
    await Admin.deleteMany()
    await Attendance.deleteMany()

    await new Student(studentOne).save()
    await new Student(studentTwo).save()
    await new Student(studentThree).save()
    await new Staff(staffOne).save()
    await new Staff(staffTwo).save()
    await new Admin(adminOne).save()
    await new Attendance(attendanceOne).save()
    await new Attendance(attendanceTwo).save()
    await new Attendance(attendanceThree).save()
    await new Attendance(attendanceFour).save()
    await new Attendance(attendanceFive).save()
}

module.exports = {
    studentOne,
    studentTwo,
    studentThree,
    staffOne,
    staffTwo,
    adminOne,
    attendanceOne,
    attendanceTwo,
    attendanceThree,
    setupDatabase
}