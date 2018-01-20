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

socket.on('newLocationMessage', function(message) {
  const li = jQuery('<li></li>');
  const a = jQuery("<a target='_blank'>My current location</a>");

  li.text(`${message.from}: `);
  a.attr('href', message.url);
  li.append(a);
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

const locationButton = jQuery('#send-location');
locationButton.on('click', function() {
  if (!navigator.geolocation) {
    return alert('geolocation not supported by your browser');
  }
  navigator.geolocation.getCurrentPosition(
    function(position) {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    },
    function() {
      alert('Unable to fetch location.');
    }
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
