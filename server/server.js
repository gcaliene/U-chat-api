const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const { generateMessage, generateLocationMessage } = require('./utils/message');
const { isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app); //The second form (creating an HTTP server yourself, instead of having Express create one for you) is useful if you want to reuse the HTTP server, for example to run socket.io within the same HTTP server instance.
// https://stackoverflow.com/questions/17696801/express-js-app-listen-vs-server-listen
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public'); //this is what you want to provide to the express status middleware
const users = new Users();

app.use(express.static(publicPath));

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.'); // return makes sure that the code below doesn't fire
    }

    socket.join(params.room); //now we have a special place to talk for specific rooms
    users.removeUser(socket.id); //removes users from other potentially chat rooms. only one rooom at a time
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

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
    const user = users.removeUser(socket.id);

    if (user) {
      //if user was removed
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io
        .to(user.room)
        .emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
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
