const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');

const io = socketio(server, {
  cors: {
    origin: "http://localhost:1234", // Frontend dev server
    methods: ["GET", "POST"]
  }
});

const connect = require('./config/database-config');

io.on('connect', (socket) => {
  console.log("New user connected:", socket.id, socket);
  
  socket.on("join_room",(roomId) => {
    socket.join(roomId);
    console.log(`${socket.id} joined room ${roomId}`);
  })

  socket.on('msg_send', (data) => {
    console.log(data);
    const messageWithId = {
      text: data.text,
      sender: socket.id,
      // roomId: data.roomId,
      username: data.username,
      timestamp: Date.now()
    };

    io.to(data.roomId).emit('msg_rcv', messageWithId); // Broadcast to all clients
  });

  socket.on("disconnect", ()=>{
    console.log("Disconnected", socket.id);
  })
});


server.listen(3000, async () => {
  console.log("Server started on port 3000");
  await connect();
  console.log("Database connected");
});
