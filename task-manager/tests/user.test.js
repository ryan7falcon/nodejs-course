import request from 'supertest'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import sgMail from '@sendgrid/mail'
import app from '../src/app.js'
import User from '../src/models/user.js'

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(async () => {}),
  send: jest.fn(async () => {
    //  console.log('sending email')
  }),
}));

const userOneId = new mongoose.Types.ObjectId()

const getUserOne = () => {
  const token = jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
  return {
    _id: userOneId,
    name: 'Mike',
    email: 'galiya991@example.com',
    password: 'whatis123',
    tokens: [{
      token,
    }],
  }
}
const userOne = getUserOne()

beforeEach(async () => {
  await User.deleteMany()
  await new User(userOne).save()
})

afterEach(() => {
  // jest.resetAllMocks();
  // jest.restoreAllMocks();
})

test('should sign up a new user', async () => {
  const userToSignup = {
    name: 'Ryan',
    email: 'ryan7falcon@example.com',
    password: '123123123',
  }

  const response = await request(app).post('/users').send(userToSignup).expect(201)

  const user = await User.findById(response.body.user._id)
  expect(user).not.toBeNull()

  expect(response.body).toMatchObject({
    user: {
      name: userToSignup.name,
      email: userToSignup.email,
    },
    token: user.tokens[0].token,
  })
  expect(user.password).not.toBe(userToSignup.password)
})

test('should login existing user', async () => {
  const response = await request(app).post('/users/login').send({
    email: userOne.email,
    password: userOne.password,
  }).expect(200)

  const user = await User.findById(response.body.user._id)

  expect(user).not.toBeNull()

  expect(response.body.token).toBe(user.tokens[1].token)
})

test('should not login non-existing user', async () => {
  await request(app).post('/users/login').send({
    email: 'bla',
    password: 'bla',
  }).expect(400)
})

test('should get profile for user', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile for unauth user', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('should delete account for user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)

  const user = await User.findById(userOneId)

  expect(user).toBeNull()
})

test('should not delete account for unauth user', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})

test('should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/image.png')
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Ellie',
    })
    .expect(200)
  const user = await User.findById(userOneId)
  expect(user.name).toBe('Ellie')
})

test('should not updae invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'paris',
    })
    .expect(400)
})
