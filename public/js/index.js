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
  socket.emit('createMessage',{
    from:'User',
    text: jQuery('[name=message]').val()
  })
});

var locationButton = jQuery('#send-location');

locationButton.on('click',(e)=>{
  if(navigator.geolocation){
    return alert("Geoloaction not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition(function(position){
    socket.emit('createLocationMessage',{
      latitude: position.coords.latitude,
      longitude : position.coords.longitude
    })
  },function(){
    return alert("Unable to fetch location");
  })
  
})