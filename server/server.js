const express = require('express')
const mongoose = require('mongoose')

// 链接mongo, 并使用reactChat这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/reactChat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

const User = mongoose.model('user', new mongoose.Schema({
  user: {type: String, require: true},
  age: {type: Number, require: true}
}))

// 新增数据
// User.create({
//   user: 'xytt',
//   age: 26
// }, function(err, doc) {
//   if (!err) {
//     console.log(doc)
//   } else {
//     console.log(err)
//   }
// })

// 删除数据
// User.remove({age: 25}, function(err, doc) {
//   console.log(doc)
// })

// 更新
// User.update({'user': 'xytt'}, {'$set': {age: 18}}, function(err, doc) {
//   console.log(doc)
// })



const app = express()

app.get('/', function(req, res) {
  res.send('<h1>express run</h1>')
})

// 获取数据 || 查找数据
app.get('/data', function(req, res) {
  User.find({age: 18}, function(err, doc) {
    if (!err) {
      res.json(doc)
    }
  })
})

app.listen(4500, function() {
  console.log('listen server at 4500')
})