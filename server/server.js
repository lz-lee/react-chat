const express = require('express')
const userRouter = require('./user')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const app = express()

const model = require('./model')
const Chat = model.getModel('chat')
// Chat.remove({}, function(){})
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(socket){
  // 当前链接的socket
  socket.on('sendMsg', function(data) {
    console.log(data)
    // io 广播全局
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg}, function(errr, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc))
    })
  })  
})

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/user', userRouter)

server.listen(4500, function() {
  console.log('listen server at 4500')
})