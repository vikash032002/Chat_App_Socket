const express = require('express');
const app = express();
const http = require('http');
const server=http.createServer(app);
const socketio=require('socket.io');
const io=socketio(server);

app.use('/',express.static(__dirname+'/public'));

io.on('connect',(socket)=>{
    console.log("new user connected",socket.id);

    socket.on('msg_send',(data)=>{
        console.log(data)
        io.emit('msg_rcv',data);
    })

    // setInterval(()=>{
    //     socket.emit('from_server');
    // },2000)
});

server.listen(3000,()=>{
    console.log("server started");
});