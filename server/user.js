const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')
const Chat = model.getModel('chat')
const __filter = {'pwd': 0, '__v': 0}

Router.get('/list', function(req, res) {
  // User.remove({}, function(err, doc) {})
  const {type} = req.query
  User.find({type}, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})

// 登录
Router.post('/login', function(req, res) {
  const {user, pwd} = req.body
  // 第一个是查询条件，第二个是显示条件
  User.findOne({user, pwd: md5Pwd(pwd)}, __filter, function(err, doc) {
    if (!doc) {
      return res.json({code: 1, msg: '用户名或者密码错误'})
    }
    res.cookie('userid', doc._id, {
      expires: new Date(Date.now() + 5 * 24 * 3600 * 1000)
    })
    return res.json({code: 0, data: doc})
  })
})

// 注册
Router.post('/register', function(req, res, next) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function(e, doc) {
    if (doc) {
      return res.json({
        code: 1,
        msg: '用户名重复'
      })
    }
    // 添加数据, 用save方法可以拿到 注册后的_id
    const userModel = new User({user, type, pwd: md5Pwd(pwd)})
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({code: 1, msg: '服务器内部错误'})
      }
      const {user, type, _id} = doc
      res.cookie('userid', _id)
      return res.json({code: 0, data: {user, type, _id}})
    })
    // User.create({user, pwd: md5Pwd(pwd), type}, function(e, d) {
    //   if (e) {
    //     return res.json({
    //       code: 1,
    //       msg: '服务器错误'
    //     })
    //   }
    //   return res.json({
    //     code: 0
    //   })
    // })
  })
})

Router.get('/info', function(req, res) {
  // 用户是否有cookie
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1, msg: '请重新登录'})
  }
  User.findOne({_id: userid}, __filter, function(err, doc) {
    if (err) {
      return res.json({code: 1, msg: '服务器错误'})
    }
    if (doc) {
      return res.json({code: 0, data: doc})
    }
  })
})

Router.post('/update', function(req, res) {
  const {userid} = req.cookies
  if (!userid) {
    return res.json({code: 1, msg: '请重新登录'})
  }
  const body = req.body
  // 第一个参数是条件，第二个参数是更新的数据
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign({}, {
      user: doc.user,
      type: doc.type
    }, body)
    return res.json({code: 0, data})
  })
})

function md5Pwd(pwd) {
  const salt = 'df24389=-031904891-·1·。／，。，、ewquph'
  return utils.md5(utils.md5(pwd + salt))
}


/**
 * chat msg
 */
Router.get('/getMsgList', function(req, res) {
  const {userid} = req.cookies
  User.find({}, function(err, userDoc) {
    let users = {}
    userDoc.forEach(v => {
      users[v._id] = {
        name: v.user,
        avatar: v.avatar
      }
    })
    Chat.find({'$or': [{from: userid}, {to: userid}]}, function(err, doc) {
       if (!err) {
         return res.json({code: 0, data: doc, users: users})
       }
    })
  })
})

module.exports = Router
