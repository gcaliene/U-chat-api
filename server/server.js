const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);
const publicPath = path.join(__dirname, '../public'); //this is what you want to provide to the express status middleware

const {generateMessage} = require('./utils/message');


app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app from generate message'));
  socket.broadcast.emit('newMessage', generateMessage("admin", 'New uesr joined'))
	socket.on('createMessage', message => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text))
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
