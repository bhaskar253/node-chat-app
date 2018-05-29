var socket = io();

socket.on('connect',function (){
  console.log('Connected to server');
});

socket.on('disconnect',function (){
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message){
  console.log('newMessage',message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e){
  e.preventDefault();

  socket.emit('createMessage',{
    from: 'User',
    text: jQuery('[name=message]').val()
  },function () {

  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click',function (e) {
  if (!navigator.geolocation)  {
  console.log('geolocation IS NOT available');
  }
  navigator.geolocation.getCurrentPosition(function(position) {
    //console.log(position);
    alert(position);
  }, function () {
    alert('Unable to fetch location.')
  });
});
