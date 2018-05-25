const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const express = require('express');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.emit('newMessage',{
    from: 'robby@roayl.com',
    text: 'Hello All',
    createdAt: 214
  });

  socket.on('createMessage', function (message){
    console.log('createMessage',message);
  });

  socket.on('disconnect',()=>{
    console.log('Disconnected from client');
  });
});

// app.get('/',(req,res)=>{
//   res.send('index.html');
// });

server.listen(port,()=>{
  console.log(`Server is up and running on port ${port}`);
})
