const socket = io();
socket.on('connect', function() {
	console.log('connected to the server mate');

	socket.emit('createMessage', {
		from: 'jenny',
		text: 'create message is working ?'
	});
});
socket.on('disconnect', function() {
	console.log('Disconnected from server, m8.');
});
socket.on('newMessage', function(message) {
	console.log('New message:', message);
});
