import express from 'express'
import './db/mongoose.js'
import jwt from 'jsonwebtoken'

import e from 'express'
import userRouter from './routers/user.js'
import taskRouter from './routers/task.js'

import Task from './models/task.js'

import User from './models/user.js'

const app = express()
const port = process.env.port || 3000

// app.use((req, res, next) => {
//   console.log(req.method, req.path)
//   if (req.method === 'GET') {
//     res.send('GET is disabled')
//   } else {
//     next()
//   }
// })

// app.use((req, res, next) => {
//   res.status(503).send('Site under maintanence')
// })

app.use(express.json())

app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})

// const main = async () => {
//   // const task = await Task.findById('6293c33101e4ac351a182bbd')
//   // await task.populate('owner')
//   // console.log(task.owner)

//   const user = await User.findById('6293c244532c23310f468a8b')
//   await user.populate('tasks')
//   console.log(user.tasks)
// }
// main()
