import * as request from 'supertest';
// eslint-disable-next-line @typescript-eslint/no-var-requires
import app from '../src/app';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Admin = require('../src/components/admins/admin.model')
import logger from '../src/components/winston-config';
const  {
    staffTwo,
    adminOne,
    setupDatabase
// eslint-disable-next-line @typescript-eslint/no-var-requires
} = require('./fixtures/testDatabase')

beforeEach(setupDatabase)

/**
 * @description below are test cases of admin 
*/
test('Should signup a new admin', async () => {
    
    await request(app).post('/admin/signup')
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        name : "Vira",
        email : "vira@admin.com",
        password : "Vira@1234"
    }).expect(201)
    await app.close()
})

test('Should login existing Admin', async () => {
    const response = await request(app).post('/admin/login').send({
        email : adminOne.email,
        password : adminOne.password
    }).expect(200)
    //console.log(response._body.user._id)
    const admin = await Admin.findById(response._body.user._id)
    expect(response.body.token).toBe(admin.tokens[1].token)
})

test('Should not login nonexisting Admin', async () => {
    await request(app).post('/admin/login').send({
        email : adminOne.email,
        password : '1234qwer'
    }).expect(500)
})

test('should get profile for admin', async () => {
    await request(app)
      .get('/admin/me').set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
      .send()
      .expect(200);
  });

test('should not get profile for unauthorize admin', async () => {
    await request(app)
    .get('/admin/me').send()
    .expect(401)
})


test('should delete account for admin', async () => {
    await request(app).delete(`/admin/me/${adminOne._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send()
    .expect(200);
    const admin = await Admin.findById(adminOne._id)
    expect(admin).toBeNull()
})

test('should not delete account for unauthenticated admin', async () => {
    await request(app).delete(`/admin/me/${adminOne._id}`).send().expect(401);
})

test('Should update valid admin fields', async () => {
    await request(app)
    .patch(`/admin/me/${adminOne._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        name : "Riya",
    })
    const admin = await Admin.findById(adminOne._id)
    expect(admin.name).toEqual('Riya')
})

test('Should not update unauthorize admin fields', async () => {
     await request(app)
    .patch(`/admin/me/${adminOne._id}`)
    .set('Authorization', `Bearer ${adminOne.tokens[0].token}`)
    .send({
        location : "Rajkot"
    })
    .expect(400)
})

test('Should not update admin with unauthorize users', async () => {
    await request(app)
   .patch(`/admin/me/${staffTwo._id}`)
   .send({
       location : "Rajkot"
   })
   .expect(401)
})