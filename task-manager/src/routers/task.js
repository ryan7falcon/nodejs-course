import express from 'express'
import Task from '../models/task.js'
import auth from '../middleware/auth.js'

const router = new express.Router()

// =====================TASKS===============================

router.post('/tasks', auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

// GET /tasks?completed=true
// GET /tasks?limit=10&skip=20
// GET /tasks?sortBy=createdAt:asc

router.get('/tasks', auth, async (req, res) => {
  const match = {}
  if (req.query.completed) {
    match.completed = req.query.completed === 'true'
  }

  const sort = {}
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':')
    sort[parts[0]] = parts[1] === 'asc' ? 1 : -1
  }

  try {
    await req.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(req.query.limit, 10),
        skip: parseInt(req.query.skip, 10),
        sort,
      },
    })
    res.send(req.user.tasks)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findOne({ _id: id, owner: req.user._id })
    if (!task) {
      return res.status(404).send()
    }
    return res.send(task)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const idValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!idValidOperation) {
    return res.status(404).send({ error: 'invalid updates!' })
  }

  const { id } = req.params

  try {
    const task = await Task.findOne({ _id: id, owner: req.user._id })
    if (!task) {
      return res.status(404).send()
    }

    updates.forEach((update) => {
      task[update] = req.body[update]
    })
    task.save()
    return res.send(task)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

    if (!task) {
      return res.status(404).send()
    }

    return res.send(task)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})
export default router
