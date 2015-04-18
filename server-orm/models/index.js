var Sequelize = require("sequelize");
var sequelize = new Sequelize("chatter", "root", "");

var User = sequelize.define('User', {
  username: Sequelize.STRING
});

var Message = sequelize.define('Message', {
  // userid: Sequelize.INTEGER,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.hasMany(Message);
Message.belongsTo(User);

// User.sync({force: true});
// Message.sync({force: true})

// Message.build({
//   text: 'hello!',
//   roomname: 'lobby',
//   UserId: 2
// }).save().success(function() {
//   console.log('saved!');
// });

// Message.findAll({
//   include: [User]
// }).complete(function(err, results) {
//   results.forEach(function(item) {
//     console.log(item.dataValues.User.dataValues);
//   })
// });

// User.findOrCreate({
//   where: {
//     username: 'Vincent'
//   }
// }).success(function(user, created) {
//   Message.build({
//     text: 'I am bart',
//     roomname: 'room1',
//     UserId: user.get('id')
//   }).save().success(function() {
//     console.log('message saved!');
//   });
// })


//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newUser = User.build({username: "Jean Valjean"});
//   newUser.save().success(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
//     User.findAll({ where: {username: "Jean Valjean"} }).success(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].username + " exists");
//       }
//     });
//   });

// Message.sync().success(function() {
//   /* This callback function is called once sync succeeds. */

//   // now instantiate an object and save it:
//   var newMessage = Message.build({userid: 1, text: "sample sample sample", roomname: "lobby"});
//   newMessage.save().success(function() {

//     /* This callback function is called once saving succeeds. */

//     // Retrieve objects from the database:
//     Message.findAll({ where: {userid: 1} }).success(function(usrs) {
//       // This function is called back with an array of matches.
//       for (var i = 0; i < usrs.length; i++) {
//         console.log(usrs[i].userid + " exists");
//       }
//     });
//   });
// });

module.exports = {
  messages: {
    get: function (cb) {
      Message.findAll({
        include: [User]
      }).complete(function(err, results) {
        console.log(results);
        cb(results);
      });
    }, // a function which produces all the messages
    post: function (reqBody, cb) {
      User.findOrCreate({
        where: {
          username: reqBody.username
        }
      }).success(function(user, created) {
        Message.build({
          text: reqBody.text,
          roomname: reqBody.roomname,
          UserId: user.get('id')
        }).save().success(function() {
          console.log('message saved!');
        });
      })
    },
  },
  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

