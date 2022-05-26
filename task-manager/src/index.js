import express from 'express'
import './db/mongoose.js'
import jwt from 'jsonwebtoken'

import e from 'express'
import userRouter from './routers/user.js'
import taskRouter from './routers/task.js'

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

// const myF = async () => {
//   const token = jwt.sign({ _id: 'abc123' }, 'thisismystuff', { expiresIn: '7 days' })
//   console.log(token)

//   const data = jwt.verify(token, 'thisismystuff')
//   console.log(data)
// }

// myF()
