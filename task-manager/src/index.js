import express from 'express'
import './db/mongoose.js'
import User from './models/user.js'
import Task from './models/task.js'

const app = express()

const port = process.env.port || 3000

app.use(express.json())

app.post('/users', async (req, res) => {
  console.log(req.body)
  const { name, email, password } = req.body
  const user = new User({ name, email, password })

  try {
    await user.save()
    res.status(201).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/users', async (req, res) => {
  try {
    const users = await User.find({})
    res.send(users)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).send()
    }
    return res.send(user)
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.patch('/users/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const idValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!idValidOperation) {
    return res.status(404).send({ error: 'invalid updates!' })
  }

  const { id } = req.params

  try {
    const user = await User.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
    if (!user) {
      return res.status(404).send()
    }

    return res.send(user)
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).send()
    }

    return res.send(user)
  } catch (e) {
    return res.status(500).send(e)
  }
})

// =====================TASKS===============================

app.post('/tasks', async (req, res) => {
  console.log(req.body)
  const { description, completed } = req.body
  const task = new Task({ description, completed })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e)
  }
})

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).send()
    }
    return res.send(task)
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const idValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!idValidOperation) {
    return res.status(404).send({ error: 'invalid updates!' })
  }

  const { id } = req.params

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    )
    if (!task) {
      return res.status(404).send()
    }

    return res.send(task)
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).send()
    }

    return res.send(task)
  } catch (e) {
    return res.status(500).send(e)
  }
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
