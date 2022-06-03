import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import http from 'http'
import { Server } from 'socket.io'

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

  socket.emit('message', 'Welcome!')
  socket.broadcast.emit('message', 'A new user has joined!')

  socket.on('sendMessage', (msg) => {
    io.emit('message', msg)
  })

  socket.on('disconnect', () => {
    io.emit('message', 'A user has left!')
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
