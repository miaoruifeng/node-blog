const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')

const router = require('./router')

const app = express()
const port = 3000

// 公开静态资源
app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

// 配置 art-template 模板
app.engine('html', require('express-art-template'))
// app.set('views', path.join(__dirname, './views')) //默认就是 ./views 目录

// 配置解析表单 POST 请求体插件（注意：一定要在 app.use(router) 之前）
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 配置 express-session
app.use(session({
  secret: 'hello world',
  resave: false,
  saveUninitialized: true
}))

// 挂载路由
app.use(router)

// 404
app.use((req, res) => {
  res.render('404.html')
})

// 配置全局错误处理中间件
app.use((err, req, res, next) => {
  res.status(500).json({
    err_code: 500,
    message: err.message
  })
})

// 监听端口 启动服务
app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`)
})