var db = require('../db')();

db.connect(function(err) {
  if (err) {
    console.log('error connecting ', err.stack);
  } else {
    console.log('connected as ID ', db.threadId);
  }
});


module.exports = {
  messages: {
    get: function (cb) {
      db.query('select messages.text, users.username, rooms.roomname from messages join users on messages.user_id=users.user_id join rooms on messages.room_id=rooms.room_id;', function(err, results) {
        if (err) {
          console.log(err);
        } else {
          cb(results);
        }
      });
    }, // a function which produces all the messages
    post: function (reqBody, cb) {
      console.log(reqBody.username);  
      var message = 'insert into messages values("' + reqBody.text + '", (select user_id from users where username="' + reqBody.username + '"), (select room_id from rooms where roomname="' + reqBody.roomname + '"), null);';

      // check if user exists, if not, make   user
      var findUser = 'select * from users where username="' + reqBody.username + '");';
      console.log("findUSEr", findUser);
      db.query("select * from users where username='" + reqBody.username + "';", function(err, user) {
        console.log("user", user);
        if (user.length === 0) {
          db.query('insert into users values("' + reqBody.username + '", null);', function(err, result) {
            console.log("result", result);
          });
          db.query(message, function(err, results) {
            if (err) {
              console.log(err);
            } else {
              cb(results);
            }
          });
        } else {
          db.query(message, function(err, results) {
            if (err) {
              console.log(err);
            } else {
              cb(results);
            }
          });
        }
      });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

