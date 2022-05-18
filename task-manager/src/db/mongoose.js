import mongoose from 'mongoose'
import validator from 'validator'

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager-api'

mongoose.connect(`${connectionURL}/${databaseName}`)

const User = mongoose.model('User', {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    },
  },
  age: {
    type: Number,
    validate(value) {
      if (value < 0) {
        throw new Error('Age must be positive')
      }
    },
  },
})

const me = new User({
  name: 'Ryan',
  age: 30,
  email: 'aaa@ff.com',
})

me.save().then(() => { console.log(me) }).catch((error) => console.log(error))

// const Task = mongoose.model('Task', {
//   description: {
//     type: String,
//   },
//   completed: {
//     type: Boolean,
//   },
// })

// const ts = new Task({
//   description: 'Clean',
//   completed: false,
// })

// ts.save().then(() => { console.log(ts) }).catch((error) => console.log(error))
