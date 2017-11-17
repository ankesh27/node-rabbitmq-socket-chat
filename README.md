rabbittmq nodejs chat app

## Installation

1 Install Node and NPM
2 Install Express and bodyparser `npm install express body-parser --save`
3 [Install rabbitMQ](https://www.rabbitmq.com/download.html) on your machine
4 Install AQMP library `npm install amqplib --save`
5 Install socket library `npm install socket.io --save`
6 In connection.js change your rabbitMQ connection parameters
7 Start the rabbirMQ server `rabbitmq-server`
8 Start your node server:- Go to your project directory and run `node app`

## Test
1 Open http://SERVERNAME:8080, in my case it's http://localhost:8080
2 Input the chat user name and submit
3 Start typing the chat message.
