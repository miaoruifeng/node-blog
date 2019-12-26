const express = require('express')

const router = express.Router()

/**
 * 渲染首页
 */
router.get('/', (req, res) => {
  res.render('index.html')
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
router.post('/login', (req, res) => {
  console.log(req.body)
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
router.post('/register', (req, res) => {
  // 1. 获取表单提交的数据
  // 2. 操作数据库
  // 3. 发送响应
  console.log(req.body)
})

module.exports = router