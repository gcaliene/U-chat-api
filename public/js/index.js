const socket = io();

socket.on('connect', function() {
  console.log('connected to the server mate');
});
socket.on('disconnect', function() {
  console.log('Disconnected from server, m8.');
});
socket.on('newMessage', function(message) {
  const li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit(
    'createMessage',
    {
      from: 'User',
      text: jQuery('[name=message]').val()
    },
    function() {}
  );
});

// socket.emit(
//   'createMessage',
//   {
//     from: 'js from index.js',
//     text: 'Hi'
//   },
//   function(data) {
//     console.log('====================================');
//     console.log('Got it', data);
//     console.log('====================================');
//   }
// );
