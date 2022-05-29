import express from 'express'
import { request } from 'http'
import multer from 'multer'
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

const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error('Must be jpg, jpeg or png'))
    }
    return cb(undefined, true)
  },
})

router.post(
  '/users/me/avatar',
  auth,
  upload.single('avatar'),
  async (req, res) => {
    try {
      req.user.avatar = req.file.buffer
      await req.user.save()
      return res.send()
    } catch (e) {
      return res.status(500).send(e.message)
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  },
)

router.delete(
  '/users/me/avatar',
  auth,
  async (req, res) => {
    try {
      req.user.avatar = undefined
      await req.user.save()
      return res.send()
    } catch (e) {
      return res.status(500).send(e.message)
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  },
)

router.get(
  '/users/:id/avatar',
  // auth,
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
      if (!user || !user.avatar) {
        throw new Error('no user or image')
      }
      res.set('Content-Type', 'image/jpg')
      res.send(user.avatar)
    } catch (e) {
      res.status(404).send(e.message)
    }
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message })
  },
)
export default router
