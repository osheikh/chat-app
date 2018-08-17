const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message')
const publicPath = path.join(__dirname,'../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log('New User connected');

  socket.on('disconnect',()=>{
    console.log('client disconnected');
  })
  
  socket.emit('newMessage',generateMessage('Admin','Welcome'));

  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Connected'));

  socket.on('createMessage',(msg)=>{
    console.log("createMessage",msg)
    io.emit('newMessage',generateMessage(msg.from,msg.text));
  })
  
  socket.on('createLocationMessage',(coords)=>{
    io.emit('newMessage',generateMessage('Admin',`Admin:${coords.latitude},${coords.longitude}`));
  });
})

app.set('PORT',process.env.PORT || 3000)

app.use(express.static(publicPath));

server.listen(app.get('PORT'),()=>{
  console.log('server started on port 3000');
})