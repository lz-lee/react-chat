const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

Router.get('/list', function(req, res) {
  // User.remove({}, function(err, doc) {})
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
    // 增数据
    User.create({user, pwd: md5Pwd(pwd), type}, function(e, d) {
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

function md5Pwd(pwd) {
  const salt = 'df24389=-031904891-·1·。／，。，、ewquph'
  return utils.md5(utils.md5(pwd + salt))
}


module.exports = Router
