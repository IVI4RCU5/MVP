var express = require('express')
var bodyParser = require('body-parser')
var db = require('../database')

var app = express()

app.use(express.static(__dirname + '/client/dist'))
app.use(bodyParser.json())

app.post('/users', function(req, res) {
  db.login(req.body)
  .then((result) => {
    res.statusCode(201).send()
  })
  .catch((error) => {
    console.error(err)
  })
})

app.get('/friends', function(req, res) {
  db.findUserInfo(req.params.user)
  .then((result) => {
    res.statusCode(200).send(result.friends)
  })
  .catch((error) => {
    console.error(error)
  })
})

app.post('/friends', function(req, res) {
  db.addFriend(req)
  .then((result) => {
    res.statusCode(201).send()
  })
  .catch((error) => {
    console.error(error)
  })
})

app.get('/messages', function(req, res) {
  db.findUserInfo(req.params.user)
  .then((result) => {
    res.statusCode(200).send(result.messages)
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
    res.statusCode(201).send()
  })
  .catch((error) => {
    console.error(error)
  })
})

app.delete('/messages', function(req, res) {
  db.deleteMessage(req.body.user, req.body.message)
  .then((result) => {
    res.statusCode().send(202)
  })
  .catch((error) => {
    console.error(error)
  })
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
})