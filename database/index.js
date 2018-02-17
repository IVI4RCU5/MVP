var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mvp');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var userSchema = mongoose.Schema({
  username: String,
  inbox: Array,
  friends: Array
})

module.exports.login = function(username, response) {
  return User.find({username: username}).exec(function(error) {
    if (error) {
      User.create({
        username: username, 
        inbox: [], 
        friends: [] 
      })
      .then((result) => {
        response.statusCode(201).send()
      })
      .catch((error) => {
        console.error(error)
      })
    } else {
      response.statusCode(200).send()
    }
  })
}

module.exports.findUserInfo = function(user) {
  return User.find({username: user}).exec()
}

module.exports.addFriend = function(req) {
  return User.findAndModify({
    query: {
      username: req.body.user
    },
    update: {
      friends: this.friends.concat(req.body.friend)
    }
  }).exec()
}

module.exports.sendMessage = function(recipient, message) {
  return User.findAndModify({
    query: {
      username: recipient
    },
    update: {
      messages: this.messages.concat(message)
    }
  }).exec()
}

module.exports.deleteMessage = function(user, message) {
  return User.findAndModify({
    query: {
      username: user
    },
    update: {
      messages: this.messages.filter((item) => {
        return item.content !== message.content
      })
    }
  }).exec()
}

var User = mongoose.model('User', userSchema)