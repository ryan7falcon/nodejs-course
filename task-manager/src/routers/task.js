import express from 'express'
import Task from '../models/task.js'

const router = new express.Router()

// =====================TASKS===============================

router.post('/tasks', async (req, res) => {
  console.log(req.body)
  const { description, completed } = req.body
  const task = new Task({ description, completed })

  try {
    await task.save()
    res.status(201).send(task)
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({})
    res.send(tasks)
  } catch (e) {
    res.status(500).send(e.message)
  }
})

router.get('/tasks/:id', async (req, res) => {
  const { id } = req.params

  try {
    const task = await Task.findById(id)
    if (!task) {
      return res.status(404).send()
    }
    return res.send(task)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

router.patch('/tasks/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const idValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!idValidOperation) {
    return res.status(404).send({ error: 'invalid updates!' })
  }

  const { id } = req.params

  try {
    const task = await Task.findById(id)

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

router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id)

    if (!task) {
      return res.status(404).send()
    }

    return res.send(task)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})
export default router
