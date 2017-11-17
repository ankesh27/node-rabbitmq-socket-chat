var amqp = require('amqplib/callback_api')

module.exports = function (cb) {
  amqp.connect('amqp://localhost', function(err, conn, self) {
      if (err) {
        console.log("Error connection"+ JSON.stringify(err));
      }
      cb(conn)
  })
}
