// Edit this file and rename as `connection.js`

var join = require('path').join
var rfs = require('fs').readFileSync
var amqp = require('amqplib/callback_api')

module.exports = function (cb) {
  amqp.connect('amqp://localhost', function(err, conn, self) {
      if (err) {
        //throw new Error(err)
        console.log("Error connection"+ JSON.stringify(err));
      }
      cb(conn)
  })
}
