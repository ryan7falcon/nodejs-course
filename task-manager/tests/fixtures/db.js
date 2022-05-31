import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import User from '../../src/models/user.js'
import Task from '../../src/models/task.js'

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

const userTwoId = new mongoose.Types.ObjectId()

const getUserTwo = () => {
  const token = jwt.sign({ _id: userTwoId }, process.env.JWT_SECRET)
  return {
    _id: userTwoId,
    name: 'Andrew',
    email: 'myhouse@example.com',
    password: 'whatis1234',
    tokens: [{
      token,
    }],
  }
}
const userTwo = getUserTwo()

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First task',
  completed: false,
  owner: userOneId,
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second task',
  completed: true,
  owner: userOneId,
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third task',
  completed: true,
  owner: userTwoId,
}

const setupDb = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

export {
  setupDb,
  userOne,
  userOneId,
  userTwo,
  userTwoId,
  taskOne,
  taskTwo,
  taskThree,
}
