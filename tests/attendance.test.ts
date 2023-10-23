/* eslint-disable @typescript-eslint/no-var-requires */
import * as request from 'supertest';
const app =  require('../src/app')
 const Attendance = require('../src/components/attendance/attendance.model')

 const  {
    studentOne, 
    studentTwo, 
    studentThree, 
    staffOne,
    staffTwo,
    staffThree,
    adminOne,
    setupDatabase
} = require('./fixtures/testDatabase')

 beforeEach(setupDatabase)

 test('Should create attendance for student', async () => {
    //console.log(studentOne)
    const response = await request(app)
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
    console.log(response.body)
    //const attendance = await Attendance.findById(response.body._id)
    //expect(attendance).not.toBeNull()
    //expect(attendance).toEqual(false)
})

