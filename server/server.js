const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

const publicPath = path.join(__dirname, '../public'); //this is what you want to provide to the express status middleware
app.use(express.static(publicPath));

io.on('connection', socket => {
	console.log('New user connected');

	socket.emit('newMessage', {
		from: 'John',
		text: 'see you then',
		createdAt: 234234234
	});

	socket.on('createMessage', message => {
		console.log('createMessage', message);
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
