const express = require('express')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req, res) {
  User.find({}, function(err, doc) {
    res.json(doc)
  })
})

Router.post('/register', function(req, res, next) {
  const {user, pwd, type} = req.body
  User.findOne({user}, function(e, doc) {
    if (doc) {
      return res.json({
        code: 1,
        msg: '用户名重复'
      })
    }
    User.create({user, pwd, type}, function(e, d) {
      if (e) {
        return res.json({
          code: 1,
          msg: '服务器错误'
        })
      }
      return res.json({
        code: 0
      })
    })
  })
})
Router.get('/info', function(req, res) {
  // 用户是否有cookie
  return res.json({code: 1})
})

module.exports = Router