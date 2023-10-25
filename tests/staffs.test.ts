import * as request from 'supertest';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import app from '../src/app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Staff = require('../src/components/staffs/staffs.model')
const  {
    staffOne,
    staffTwo,
    adminOne,
    setupDatabase
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('./fixtures/testDatabase')

beforeEach(setupDatabase)

test('Should signup a new staff', async () => {
    await request(app).post('/staff/signup')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        name : 'Jaya',
        email :'jaya@example.com',
        password : 'jaya@1234',
        phoneNumber : 2934567890,
        department : 'CE'
    }).expect(201)
    app.close()
})


test('Should login existing Staff', async () => {
    const response = await request(app).post('/staff/login').send({
        email : staffOne.email,
        password : staffOne.password
    }).expect(200)
    const staff = await Staff.findById(response._body.user._id)
    expect(response.body.token).toBe(staff.tokens[1].token)
})


test('Should not login nonexisting Staff', async () => {
    await request(app).post('/staff/login').send({
        email : staffOne.email,
        password : '1234qwer'
    }).expect(500)
})

test('should get profile for staff', async () => {
    await request(app)
      .get('/staff/me').set('Authorization', `Bearer ${staffTwo.tokens[0].token}`)
      .send()
      .expect(200);
  });

test('should not get profile for unauthorize staff', async () => {
    await request(app)
    .get('/staff/me').send()
    .expect(401)
})

test('should delete account for staff', async () => {
    await request(app).delete(`/staff/me/${staffOne._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send()
    .expect(200);
    const staff = await Staff.findById(staffOne._id)
    expect(staff).toBeNull()
})

test('should not delete account for unauthenticated staff', async () => {
    await request(app).delete(`/staff/me/${staffOne._id}`).send().expect(401);
})

test('Should update valid staff fields', async () => {
    await request(app)
    .patch(`/staff/me/${staffTwo._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        name : "Riya",
    })
    const staff = await Staff.findById(staffTwo._id)
    expect(staff.name).toEqual('Riya')
})

test('Should not update unauthorize staff fields', async () => {
     await request(app)
    .patch(`/staff/me/${staffTwo._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        location : "Rajkot"
    })
    .expect(400)
})

test('Should not update staff with unauthorize users', async () => {
    await request(app)
   .patch(`/staff/me/${staffTwo._id}`)
   .send({
       location : "Rajkot"
   })
   .expect(401)
})