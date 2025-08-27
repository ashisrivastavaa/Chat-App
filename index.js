const http = require('http');
const express = require('express');
const app = express();
const { Server } = require('socket.io');
const path = require('path');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.resolve('./public')));

app.get("/", (req, res) => {
  return res.sendFile(path.resolve('./public/index.html'));
});

const users = {};  // id -> username mapping

io.on('connection', (socket) => {    //Runs whenever a new user connects via Socket.IO.  socket ->Represents that specific user’s connection.
  console.log("User connected:", socket.id);

  socket.on("set-username", (username) => {
    users[socket.id] = username;
  });

  socket.on('user-message', (message) => {
    io.emit('message', { 
      id: socket.id, 
      text: message, 
      username: users[socket.id] || "User"
    });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
  });
});

server.listen(3000);
