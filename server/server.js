const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){ 
  console.log('aaa')
  socket.on('sendMsg', function(data) {
    console.log(data)
  })
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(4500, function() {
  console.log('listen server at 4500')
})