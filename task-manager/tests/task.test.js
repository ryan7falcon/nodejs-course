import request from 'supertest'
import sgMail from '@sendgrid/mail'

import app from '../src/app.js'
import User from '../src/models/user.js'
import Task from '../src/models/task.js'
import {
  userOne, userOneId, setupDb, userTwo, userTwoId, taskOne,
} from './fixtures/db.js'

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(async () => {}),
  send: jest.fn(async () => {
    //  console.log('sending email')
  }),
}));

beforeEach(setupDb)

test('Should create a task for user', async () => {
  const response = await request(app)
    .post('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      description: 'from test',
    })
    .expect(201)
  const task = await Task.findById(response.body._id)
  expect(task).not.toBeNull()
  expect(task.completed).toEqual(false)
})

test('gets all tasks for a user', async () => {
  const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
  expect(200)
  expect(response.body.length).toBe(2)
})

test('should not allow the second user to delete the first task', async () => {
  const response = await request(app)
    .delete(`/tasks/${taskOne._id}`)
    .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
    .send()
    .expect(404)
  const task = Task.findById(taskOne._id)
  expect(task).not.toBeNull()
})
