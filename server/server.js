const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public'); //this is what you want to provide to the express status middleware

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }

    socket.join(params.room); //now we have a special place to talk for specific rooms

    socket.emit(
      'newMessage',
      generateMessage('Admin', 'Welcome to the chat app from generate message!')
    );
    socket.broadcast
      .to(params.room)
      .emit(
        'newMessage',
        generateMessage('Admin', `${params.name} has joined!`)
      );
    callback(); //remember that in chat.js the first argument is the error
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });
  socket.on('createLocationMessage', coords => {
    io.emit(
      'newLocationMessage',
      generateLocationMessage('Admin', coords.latitude, coords.longitude)
    );
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(
    `Started on port ${port} & the Mongo DB is: ${process.env.MONGODB_URI}`
  );
});

// console.log(__dirname+'/../public'); //this doesn't look clean

//NOTES
//__dirname gives you the current folder which would be server.. and Using path.join the second argument would be the public folder.
