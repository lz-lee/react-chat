const mongoose = require('mongoose')

// 链接mongo, 并使用reactChat这个集合
const DB_URL = 'mongodb://127.0.0.1:27017/reactChat'
mongoose.connect(DB_URL)
mongoose.connection.on('connected', function() {
  console.log('mongo connect success')
})

const models = {
  user: {
    'user': {
      type: String, 
      require: true
    },
    'pwd': {
      type: String, 
      require: true
    },
    'type': {
      'type': String, 
      require: true
    },
    'avatar': {
      type: String
    },
    'desc': {
      type: String
    },
    'title': {
      type: String
    },
    'company': {
      type: String
    },
    'money': {
      type: String
    },
  },
  chat: {
    // 每次聊天唯一的标识， 为用户的id拼接字符串
    'chatid': {
      type: String,
      require: true
    },
    'from': {
      type: String,
      require: true
    },
    'to': {
      type: String,
      require: true
    },
    'read': {
      type: Boolean,
      default: false
    },
    'content': {
      type: String,
      require: true
    },
    'create_time': {
      type: Number,
      require: true,
      default: new Date().getTime()
    },
  }
}

for (let k in models) {
  mongoose.model(k, new mongoose.Schema(models[k]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}