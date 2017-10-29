const express = require('express')
const userRouter = require('./user')

const app = express()

app.use('/user', userRouter)

app.listen(4500, function() {
  console.log('listen server at 4500')
})