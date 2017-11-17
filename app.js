var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);


var rabbitConn = require('./connection');


var chat = io.of('/chat');

rabbitConn(function(conn) {
  conn.createChannel(function(err, ch) {
    if (err) {
      console.log("Error---->"+JSON.stringify(err));
    }
    var ex = 'exchange'
    ch.assertExchange(ex, 'fanout', {durable: false})     
    ch.assertQueue('', {exclusive: true}, function(err, q) {
      if (err) {
        console.log("Error---->"+JSON.stringify(err));
      }
      ch.bindQueue(q.queue, ex, '')
      ch.consume(q.que, function(msg) {
        chat.emit('chat', msg.content.toString())
      })       
    }, {noAck: true})
  })
})


app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/api', router)
router.route('/chat')

.post(function(req, res) {
    rabbitConn(function(conn) {
      conn.createChannel(function(err, ch) {
        if (err) {
          console.log("Error---->"+JSON.stringify(err));
        }
        console.log(JSON.stringify(req.body.messageType)+"------>");
        var ex = 'exchange'
        var q = 'chat_q';
        var msg = JSON.stringify(req.body)

        ch.assertExchange(ex, 'fanout', {durable: false})
        ch.publish(ex, '', new Buffer(msg), {persistent: false})
        ch.assertQueue(q, {durable: true})
        ch.sendToQueue(q, new Buffer(msg), {persistent: true})
        ch.close(function() {conn.close()})
      })
    })
  })
  
  .get(function(req, res){
    rabbitConn(function(conn){
      conn.createChannel(function(err, ch) {
        if (err) {
          console.log("Error---->"+JSON.stringify(err));
        }
        var q = 'chat_q'
        
        ch.assertQueue(q, {durable: true}, function(err, status) {
          if (err) {
            console.log("Error---->"+JSON.stringify(err));
          }
          else if (status.messageCount === 0) {
            res.send('{"messages": 0}')
          } else {
            var numChunks = 0;
            
            res.writeHead(200, {"Content-Type": "application/json"})
            res.write('{"messages": [')
            
            ch.consume(q.que, function(msg) {
              var resChunk = msg.content.toString()
              
              res.write(resChunk)
              numChunks += 1
              numChunks < status.messageCount && res.write(',')
              
              if (numChunks === status.messageCount) { 
                res.write(']}')
                res.end()
                ch.close(function() {conn.close()})
              }
            })  
          }
        })             
      }, {noAck: true})
    })
  })

server.listen(8080, '0.0.0.0', 
  function() { 
    console.log('Chat at localhost:8080')
  }
)
