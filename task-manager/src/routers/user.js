import express from 'express'
import { request } from 'http'
import User from '../models/user.js'
import auth from '../middleware/auth.js'

const router = new express.Router()

router.post('/users', async (req, res) => {
  const { name, email, password } = req.body
  const user = new User({ name, email, password })
  try {
    const token = await user.generateAuthToken()
    res.status(201).send({ user, token })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()

    res.send({ user, token })
  } catch (e) {
    res.status(400).send(e.message)
  }
})

router.post('/users/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token)
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).save()
  }
})

router.post('/users/logoutAll', auth, async (req, res) => {
  try {
    req.user.tokens = []
    await req.user.save()
    res.send()
  } catch (e) {
    res.status(500).save()
  }
})

router.get('/users/me', auth, async (req, res) => {
  res.send(req.user)
})

router.patch('/users/me', auth, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const idValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!idValidOperation) {
    return res.status(404).send({ error: 'invalid updates!' })
  }

  try {
    const { user } = req

    updates.forEach((update) => {
      user[update] = req.body[update]
    })

    await user.save()

    return res.send(user)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

router.delete('/users/me', auth, async (req, res) => {
  try {
    // const user = await User.findByIdAndDelete(req.user._id)

    // if (!user) {
    //   return res.status(404).send()
    // }

    await req.user.remove()

    return res.send(req.user)
  } catch (e) {
    return res.status(500).send(e.message)
  }
})

export default router
