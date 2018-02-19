var express = require('express')
var path = require ('path')
var bodyParser = require('body-parser')
var db = require('../database')
// var webpack = require('webpack')
// var webpackConfig = require('../webpack.config')
// var middleware = require('webpack-dev-middleware')

var app = express()
// var compiler = webpack(webpackConfig)

app.use(express.static(path.join(__dirname, '/../client/dist/')))
app.use(bodyParser.json())
// app.use(middleware(compiler, {
//   hot: true,
//   filename: 'bundle.js',
//   publicPath: '/',S
//   stats: {
//     colors: true,
//   },
//   historyApiFallback: true,
// }));

// app.get('/', (req, res) => {
//   console.log('getting root')
//   res.send('App.jsx')
// })

app.post('/users', function(req, res) {
  db.login(req.body)
  .then((result) => {
    res.send()
  })
  .catch((error) => {
    console.error(err)
  })
})

app.get('/friends', function(req, res) {
  db.findUserInfo(req.params.user)
  .then((result) => {
    res.send(result.friends)
  })
  .catch((error) => {
    console.error(error)
  })
})

app.post('/friends', function(req, res) {
  db.addFriend(req)
  .then((result) => {
    res.send()
  })
  .catch((error) => {
    console.error(error)
  })
})

app.get('/messages', function(req, res) {
  db.findUserInfo(req.params.user)
  .then((result) => {
    res.send(result.messages)
  })
  .catch((error) => {
    console.error(error)
  })
})

app.post('/messages', function(req, res) {
  db.findUserInfo(req.body.author)
  .then((result) => {
    result.friends.forEach((friend) => {
      db.sendMessage(friend, req.body)
    })
    res.send()
  })
  .catch((error) => {
    console.error(error)
  })
})

app.delete('/messages', function(req, res) {
  db.deleteMessage(req.body.user, req.body.message)
  .then((result) => {
    res.send(202)
  })
  .catch((error) => {
    console.error(error)
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
})