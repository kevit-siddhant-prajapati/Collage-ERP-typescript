/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line @typescript-eslint/no-var-requires
import * as request from 'supertest';
const app  = require('../src/app');
const Student = require('../src/components/students/students.model')
const Staff = require('../src/components/staffs/staffs.model')
const Admin = require('../src/components/admins/admin.model')
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

//NOT understard the problem
test('Should signup a new admin', async () => {
    
    const response =await request(app).post('/admin/signup')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        name : "Siddhant",
        email : "siddhant@admin.com",
        password : "Siddhant@1"
    }).expect(201)
    console.log(response.body)
    //Assert that the database was changed correctly
    // const admin = await Admin.findById(response.body._id)
    // expect(admin).not.toBeNull()

    // //Assertion about the response
    // expect(response.body).toMatchObject({
    //     response1 : {
    //         name : "Siddhant",
    //         email : "siddhant@admin.com"
    //     },
    //     token : admin.tokens[0].token
    // })
    // expect(admin.password).not.toBe('Siddhant@1')
})

test('Should login existing Admin', async () => {
    const response = await request(app).post('/admin/login').send({
        email : adminOne.email,
        password : adminOne.password
    }).expect(200)
    console.log(response._body.user._id)
    const admin = await Admin.findById(response._body.user._id)
    expect(response.body.token).toBe(admin.tokens[1].token)
})

test('Should not login nonexisting Admin', async () => {
    await request(app).post('/admin/login').send({
        email : adminOne.email,
        password : '1234qwer'
    }).expect(500)
})

test('Should signup a new staff', async () => {
    
    const response =await request(app).post('/staff/signup')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        name : 'Jaya',
        email :'jaya@example.com',
        password : 'jaya@1234',
        phoneNumber : 2934567890,
        department : 'CE'
    }).expect(201)

    //Assert that the database was changed correctly
    // const staff = await Staff.findById(response.body.response1._id)
    // expect(staff).not.toBeNull()

    // //Assertion about the response
    // expect(response.body).toMatchObject({
    //     response1 : {
    //         name : 'Jaya',
    //         email : 'jaya@example.com',
    //         phoneNumber : 2934567890,
    //         department : 'CE'
    //     },
    //     token : staff.tokens[0].token
    // })
    // expect(staff.password).not.toBe('jaya@1234')
})


test('Should login existing Staff', async () => {
    const response = await request(app).post('/staff/login').send({
        email : staffOne.email,
        password : staffOne.password
    }).expect(200)
    console.log(response._body.user._id)
    const staff = await Staff.findById(response._body.user._id)
    expect(response.body.token).toBe(staff.tokens[1].token)
})


test('Should not login nonexisting Staff', async () => {
    await request(app).post('/staff/login').send({
        email : staffOne.email,
        password : '1234qwer'
    }).expect(500)
})



test('Should signup a new student', async () => {
    
    const response = await request(app).post('/student/signup')
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

     console.log(response.body.newStudent)
    // //Assert that the database was changed correctly
    //  const student = await Student.findById(response.body.newStudent._id)
    // expect(student).not.toBeNull()

    // //Assertion about the response
    // expect(response.body.newStudent).toMatchObject({
    //     response1 : {
    //         name : 'Aman',
    //         email : 'aman@example.com',
    //         phoneNumber : 2134567890,
    //         department : 'CE',
    //         batch : 2020,
    //         currentSem : 1
    //     },
    //     token : student.tokens[0].token
    // })
    // expect(student.password).not.toBe('Aman@1234')
})



test('Should login existing Student', async () => {
    const response = await request(app).post('/student/login').send({
        email : studentOne.email,
        password : studentOne.password
    }).expect(200)
    console.log(response._body.user._id)
    const student = await Student.findById(response._body.user._id)
    expect(response.body.token).toBe(student.tokens[1].token)
})

test('Should not login nonexisting Student', async () => {
    await request(app).post('/student/login').send({
        email : studentOne.email,
        password : '1234qwer'
    }).expect(500)
})






// test('should get profile for user', async () => {
//     await request(app)
//       .get('/users/me').set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//       .send()
//       .expect(200);
//   });

// test('should not get profile for unauthorize user', async () => {
//     await request(app)
//     .get('/users/me').send()
//     .expect(401)
// })

// test('should delete account for user', async () => {
//     await request(app).delete('/users/me')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200);
//     const user = await User.findById(userOneId)
//     expect(user).toBeNull()
// })

// test('should not delete account for unauthenticated user', async () => {
//     await request(app).delete('/users/me').send().expect(401);
// })

// test('Should upload avatar image', async () => {
//     await request(app)
//     .post('/users/me/avatar')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .attach('avatar', 'tests/fixtures/forest-wallpaper.jpg')
//     .expect(200)
//     const user = await User.findById(userOneId)
//     expect(user.avatar).toEqual(expect.any(Buffer))
// })

// test('Should update valid user fields', async () => {
//     await request(app)
//     .patch('/users/me')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send({
//         name : "siddhant",
//     })
//     const user = await User.findById(userOneId)
//     expect(user.name).toEqual('siddhant')
// })

// test('Should not update unauthorize user fields', async () => {
//      await request(app)
//     .patch('/users/me')
//     .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
//     .send({
//         location : "Rajkot"
//     })
//     .expect(400)
// })

