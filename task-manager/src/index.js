import express from 'express'
import './db/mongoose.js'
import User from './models/user.js'
import Task from './models/task.js'

const app = express()

const port = process.env.port || 3000

app.use(express.json())

app.post('/users', (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body
  const user = new User({ name, email, password })

  user.save()
    .then(() => {
      res.send(user)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})

app.post('/tasks', (req, res) => {
  console.log(req.body)
  const { description, completed } = req.body
  const task = new Task({ description, completed })

  task.save()
    .then(() => {
      res.send(task)
    })
    .catch((error) => {
      res.status(400).send(error)
    })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
