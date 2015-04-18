var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.sync({force: true}).success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newUser = User.build({username: "Jean Valjean"});
  newUser.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].username + " exists");
      }
    });
  });
});

Message.sync().success(function() {
  /* This callback function is called once sync succeeds. */

  // now instantiate an object and save it:
  var newMessage = Message.build({userid: 1, text: "sample sample sample", roomname: "lobby"});
  newMessage.save().success(function() {

    /* This callback function is called once saving succeeds. */

    // Retrieve objects from the database:
    Message.findAll({ where: {userid: 1} }).success(function(usrs) {
      // This function is called back with an array of matches.
      for (var i = 0; i < usrs.length; i++) {
        console.log(usrs[i].userid + " exists");
      }
    });
  });
});

module.exports = {
  messages: {
    get: function (cb) {

    }, // a function which produces all the messages
    post: function (reqBody, cb) {

    },
  },
  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

