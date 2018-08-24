var socket = io();

socket.on('connect',()=>{
  console.log("connected to server");
})

socket.on('disconnect',()=>{
  console.log('disconnected from server');
})

socket.on('newMessage',(msg)=>{
  console.log('New email',msg);
  var li = jQuery('<li></li>');
  li.text(`${msg.from}:${msg.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit',(e)=>{
  e.preventDefault();
  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage',{
    from:'User',
    text: messageTextbox.val()
  },function(){
    messageTextbox.val('');
  });

});

var locationButton = jQuery('#send-location');

locationButton.on('click',(e)=>{
  if(navigator.geolocation){
    return alert("Geoloaction not supported by your browser.");
  }
  
  locationButton.attr('disabled','disabled').text('Sending location...');

  navigator.geolocation.getCurrentPosition(function(position){
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude : position.coords.longitude
    })
  },function(){
    locationButton.removeAttr('disabled').text('Send location');
    return alert("Unable to fetch location");
  })
  
})