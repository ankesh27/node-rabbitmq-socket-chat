tmq nodejs chat app

## Installation

⋅⋅* Install Node and NPM
⋅⋅* Install Express and bodyparser `npm install express body-parser --save`
⋅⋅* [Install rabbitMQ](https://www.rabbitmq.com/download.html) on your machine
⋅⋅* Install AQMP library `npm install amqplib --save`
⋅⋅* Install socket library `npm install socket.io --save`
⋅⋅* In connection.js change your rabbitMQ connection parameters
⋅⋅* Start the rabbirMQ server `rabbitmq-server`
⋅⋅* Start your node server:- Go to your project directory and run `node app`

## Test
⋅⋅* Open http://SERVERNAME:8080, in my case it's http://localhost:8080
⋅⋅* Input the chat user name and submit
⋅⋅* Start typing the chat message.
