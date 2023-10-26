/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as request from 'supertest';
import app from '../src/app';
const Student = require('../src/components/students/students.model')

// your-test-file.ts
import logger from '../src/components/winston-config';

const  {
    studentOne, 
    studentTwo, 
    studentThree, 
    staffOne,
    staffTwo,
    setupDatabase
} = require('./fixtures/testDatabase')

beforeEach(setupDatabase)

/**
 * @describe Below given test cases of student
*/
test('Should signup a new student', async () => {
    await request(app).post('/student/signup')
    .set('Authorization', `Bearer ${staffOne.tokens[0].token}`)
    .send({
        name : 'Aman',
        email :'aman@example.com',
        password : 'Aman@1234',
        phoneNumber : 2134567890,
        department : 'CE',
        batch : 2020,
        currentSem : 1
    }).expect(201)
    await app.close()
})

test('Should login existing Student', async () => {
    const response = await request(app).post('/student/login').send({
        email : studentOne.email,
        password : studentOne.password
    }).expect(200)
    //console.log(response._body.user._id)
    const student = await Student.findById(response._body.user._id)
    expect(response.body.token).toBe(student.tokens[1].token)
})

test('Should not login nonexisting Student', async () => {
    await request(app).post('/student/login').send({
        email : studentOne.email,
        password : '1234qwer'
    }).expect(500)
})

test('should get profile for student', async () => {
    await request(app)
      .get('/student/me').set('Authorization', `Bearer ${studentTwo.tokens[0].token}`)
      .send()
      .expect(200);
  });

test('should not get profile for unauthorize student', async () => {
    await request(app)
    .get('/student/me').send()
    .expect(401)
})


test('should delete account for student', async () => {
    await request(app).delete(`/student/me/${studentOne._id}`)
    .set('Authorization', `Bearer ${staffTwo.tokens[0].token}`)
    .send()
    .expect(200);
    const student = await Student.findById(studentOne._id)
    expect(student).toBeNull()
})

test('should not delete account for unauthenticated student', async () => {
    await request(app).delete(`/student/me/${studentOne._id}`).send().expect(401);
})


test('Should update valid student fields', async () => {
    await request(app)
    .patch(`/student/me/${studentThree._id}`)
    .set('Authorization', `Bearer ${staffTwo.tokens[0].token}`)
    .send({
        name : "siddhant",
    })
    const student = await Student.findById(studentThree._id)
    expect(student.name).toEqual('siddhant')
})

test('Should not update unauthorize student fields', async () => {
     await request(app)
    .patch(`/student/me/${studentThree._id}`)
    .set('Authorization', `Bearer ${staffOne.tokens[0].token}`)
    .send({
        location : "Rajkot"
    })
    .expect(400)
})

test('Should not update student with unauthorize users', async () => {
    await request(app)
   .patch(`/student/me/${studentThree._id}`)
   .send({
       location : "Rajkot"
   })
   .expect(401)
})


