const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');
const app = express();
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname,"../public");
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

app.get('/rooms',(req,res)=>{
  var availableRooms = [];
  var rooms = io.sockets.adapter.rooms;
  if (rooms) {
      for (var room in rooms) {
          if (!rooms[room].sockets.hasOwnProperty(room)) {
              availableRooms.push(room);
          }
      }
  }
  res.send(availableRooms);
});

io.on('connection', (socket)=>{
  console.log('New user connected');

  socket.on('join',(params,callback)=>{
    params.room = params.room.toLowerCase();  //to avoid duplicate rooms
    if(!isRealString(params.name) || !isRealString(params.room)){
      return callback('Name and Room-name are required');
    }
    if(users.isNameTaken(params.name,params.room)){
      return callback('Name already taken.');
    }


    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);


    //Socket supports Rooms
    //io.emit -> io.to(params.room)
    //socket.broadcast.emit -> socket.broadcast.to(params.room).emit
    //socket.emit

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app.'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has joined`));

    callback();
  });

  socket.on('createMessage',(message,callback)=>{
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage',generateMessage(user.name,message.text));
    }
    callback();
    // socket.broadcast.emit('newMessage',{
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
  });

  socket.on('createLocationMessage',(coords)=>{
    var user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  socket.on('disconnect',()=>{
    console.log('User disconnected');

    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
    }
  });
});

server.listen(port,()=>{
  console.log(`Started on port ${port}.`);
});
