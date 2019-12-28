const express = require('express')
const router = express.Router()
const md5 = require('blueimp-md5')

const User = require('./models/user')

/**
 * 渲染首页
 */
router.get('/', (req, res) => {
  // console.log(req.session.user)
  res.render('index.html', {
    user: req.session.user
  })
})

/**
 * 渲染登录页面
 */
router.get('/login', (req, res) => {
  res.render('login.html')
})

/**
 * 处理登陆请求
 */
router.post('/login', (req, res, next) => {
  // 1. 获取表单数据
  // 2. 查询数据库用户名密码是否正确
  // 3. 发送响应数据

  // console.log(req.body)
  const body = req.body
  try {
    User.findOne({
        email: body.email,
        password: md5(md5(body.password))
      })
      .then((user) => {
        if (!user) {
          return res.status(200).json({
            err_code: 1,
            message: '邮箱或密码错误！'
          })
        }

        // 用户存在 登录成功，通过 session 记录登录状态
        req.session.user = user
        res.status(200).json({
          err_code: 0,
          message: '登陆成功！'
        })
      })
  } catch (err) {
    // res.status(500).json({
    //   err_code: 500,
    //   message: err.message
    // })
    next(err)
  }
})

/**
 * 渲染注册页面
 */
router.get('/register', (req, res) => {
  res.render('register.html')
})

/**
 * 处理注册请求
 */
router.post('/register', async (req, res, next) => {
  // 1. 获取表单提交的数据
  // 2. 操作数据库
  // 3. 发送响应
  // console.log(req.body)
  const body = req.body
  try {
    if (await User.findOne({
        email: body.email
      })) {
      // json() 会自动把对象转为字符串发送给浏览器
      return res.status(200).json({
        err_code: 1,
        message: '邮箱已存在！'
      })
    }
    if (await User.findOne({
        nickname: body.nickname
      })) {
      return res.status(200).json({
        err_code: 2,
        message: '昵称已存在！'
      })
    }

    // 对密码进行 md5 重复加密
    body.password = md5(md5(body.password))
    // 创建用户，执行注册
    await new User(body).save()

    // 把 user 保存到 session 中
    const user = new User(body)
    req.session.user = user

    res.status(200).json({
      err_code: 0,
      message: '注册成功'
    })
  } catch (err) {
    // res.status(500).json({
    //   err_code: 500,
    //   message: err.message
    // })
    next(err)
  }
})

/**
 * 处理退出登录
 */
router.get('/logout', (req, res) => {
  // 退出登录 清楚 session
  req.session.user = null

  // 重定向到登录页
  // a 链接跳转是同步请求，所以服务端可以重定向
  res.redirect('/login')
})

module.exports = router