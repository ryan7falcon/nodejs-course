import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import http from 'http'
import { Server } from 'socket.io'
import Filter from 'bad-words'
import { generateMessage, generateLocationMessage } from './utils/messages.js'
import {
  addUser, removeUser, getUser, getUsersInRoom,
} from './utils/users.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public')
const port = process.env.PORT

app.use(express.json())
app.use(express.static(publicDir))

const adminName = 'Admin'

io.on('connection', (socket) => {
  console.log('New websocket connection')

  socket.on('join', (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options })

    if (error) {
      return callback(error)
    }

    socket.join(user.room)

    socket.emit('message', generateMessage(adminName, 'Welcome!'))

    socket.broadcast.to(user.room).emit('message', generateMessage(adminName, `${user.username} has joined!`))

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room),
    })

    callback()
  })

  socket.on('sendMessage', (msg, callback) => {
    const user = getUser(socket.id)

    const filter = new Filter()

    if (filter.isProfane(msg)) {
      return callback('Profanity is not allowed!')
    }

    io.to(user.room).emit('message', generateMessage(user.username, msg))
    return callback()
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id)

    if (user) {
      io.to(user.room).emit('message', generateMessage(adminName, `${user.username} has left`))
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room),
      })
    }
  })

  socket.on('sendLocation', (loc, callback) => {
    const user = getUser(socket.id)

    io.to(user.room).emit('locationMessage', generateLocationMessage(
      user.username,
      `https://google.com/maps?q=${loc.latitude},${loc.longitude}`,
    ))
    callback()
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
