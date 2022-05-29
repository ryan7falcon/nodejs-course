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

router.get('/tasks', auth, async (req, res) => {
  try {
    await req.user.populate('tasks')
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
