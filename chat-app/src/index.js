import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import http from 'http'
import { Server } from 'socket.io'
import Filter from 'bad-words'
import { generateMessage, generateLocationMessage } from './utils/messages.js'

const app = express()
const server = http.createServer(app)
const io = new Server(server)

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public')
const port = process.env.PORT

app.use(express.json())
app.use(express.static(publicDir))

io.on('connection', (socket) => {
  console.log('New websocket connection')

  socket.emit('message', generateMessage('Welcome!'))
  socket.broadcast.emit('message', generateMessage('A new user has joined!'))

  socket.on('sendMessage', (msg, callback) => {
    const filter = new Filter()

    if (filter.isProfane(msg)) {
      return callback('Profanity is not allowed!')
    }
    io.emit('message', generateMessage(msg))
    return callback()
  })

  socket.on('disconnect', () => {
    io.emit('message', generateMessage('A user has left!'))
  })

  socket.on('sendLocation', (loc, callback) => {
    io.emit('locationMessage', generateLocationMessage(`https://google.com/maps?q=${loc.latitude},${loc.longitude}`))
    callback()
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
