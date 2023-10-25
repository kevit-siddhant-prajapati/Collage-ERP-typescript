/* eslint-disable @typescript-eslint/no-var-requires */
import * as request from 'supertest';
import app from '../src/app';
const Attendance = require('../src/components/attendance/attendance.model')
import logger from '../src/components/winston-config';
 const  {
    studentOne, 
    studentTwo, 
    staffOne,
    staffTwo,
    adminOne,
    attendanceOne,
    attendanceTwo,
    attendanceThree,
    setupDatabase
} = require('./fixtures/testDatabase')

 beforeEach(setupDatabase)

 test('Should create attendance for student', async () => {
    await request(app)
    .post('/student/attendance')
    .set('Authorization', `Bearer ${staffOne.tokens[0].token}`)
    .send({
        date : "2020-07-18",
        attendance : [
            studentOne._id,
            studentTwo._id
        ]
    })
    .expect(201)
    await app.close()
})

test('Should not create attendance of nonexistance student', async () => {
    await request(app)
    .post('/student/attendance')
    .set('Authorization', `Bearer ${staffOne.tokens[0].token}`)
    .send({
        date : "2020-07-18",
        attendance : [
            studentOne._id,
            studentTwo._id,
            staffOne._id
        ]
    })
    .expect(500)
})

test('Unauthorize user Should not fill attendance of student', async () => {
    await request(app)
    .post('/student/attendance')
    .send({
        date : "2020-07-18",
        attendance : [
            studentOne._id,
            studentTwo._id
        ]
    })
    .expect(401)
})

test('Authorize User show data of students', async () => {
    await request(app)
    .get('/students/getAttendance')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send()
    .expect(200)
    const attendance = await Attendance.find({roleOfUser : 'Student'})
    expect(attendance).not.toBeNull()
})

test('Unauthorize User should not show data of students', async () => {
    await request(app)
    .get('/students/getAttendance')
    .send()
    .expect(401)
})

test('Should update valid student fields', async () => {
    await request(app)
    .patch(`/student/attendance/update/${attendanceOne._id}`)
    .set('Authorization', `Bearer ${staffTwo.tokens[0].token}`)
    .send({
        date : "2020-08-22",
    }).expect(200)
    const attendance = await Attendance.findById(attendanceOne._id)
    expect(attendance.date).toEqual(new Date(attendance.date))
})

test('Should update invalid student fields', async () => {
    await request(app)
    .patch(`/student/attendance/update/${attendanceOne._id}`)
    .set('Authorization', `Bearer ${staffTwo.tokens[0].token}`)
    .send({
        name : "Sid",
    }).expect(400)
})

test('Unauthorize User Should not update student fields', async () => {
    await request(app)
    .patch(`/student/attendance/update/${attendanceOne._id}`)
    .send({
        date : "2020-08-22",
    }).expect(401)
})



test('Should create attendance for staff', async () => {
    await request(app)
    .post('/staff/attendance')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        date : "2020-07-18",
        attendance : [
            staffOne._id,
            staffTwo._id
        ]
    })
    .expect(201)
    await app.close()
})

test('Should not create attendance of nonexistance student', async () => {
    await request(app)
    .post('/staff/attendance')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        date : "2020-07-18",
        attendance : [
            studentOne._id,
            staffTwo._id,
            staffOne._id
        ]
    })
    .expect(500)
})

test('Unauthorize user Should not fill attendance of student', async () => {
    await request(app)
    .post('/staff/attendance')
    .send({
        date : "2020-07-18",
        attendance : [
            staffOne._id,
            staffTwo._id
        ]
    })
    .expect(401)
})

test('Authorize User show data of staffs', async () => {
    await request(app)
    .get('/staffs/getAttendance')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send()
    .expect(200)
    const attendance = await Attendance.find({roleOfUser : 'Staff'})
    expect(attendance).not.toBeNull()
})

test('Unauthorize User should not show data of staffs', async () => {
    await request(app)
    .get('/staffs/getAttendance')
    .send()
    .expect(401)
})

test('Should update valid staff fields', async () => {
    await request(app)
    .patch(`/staff/attendance/update/${attendanceTwo._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        date : "2020-08-22",
    }).expect(200)
    const attendance = await Attendance.findById(attendanceTwo._id)
    expect(attendance.date).toEqual(new Date(attendance.date))
})

test('Should update invalid staff fields', async () => {
    await request(app)
    .patch(`/staff/attendance/update/${attendanceOne._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        name : "Sid",
    }).expect(400)
})

test('Unauthorize User Should not update staff fields', async () => {
    await request(app)
    .patch(`/staff/attendance/update/${attendanceThree._id}`)
    .send({
        date : "2020-08-22",
    }).expect(401)
})
