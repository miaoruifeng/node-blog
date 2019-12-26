const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/node_modules', express.static(path.join(__dirname, './node_modules')))

app.engine('html', require('express-art-template'))
// app.set('views', path.join(__dirname, './views')) //默认就是 ./views 目录

app.get('/', (req, res) => {
  res.render('index.html', {
    name: 'world'
  })
})

app.listen(port, () => {
  console.log(`Server is running at http://127.0.0.1:${port}`)
})