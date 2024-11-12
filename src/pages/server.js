const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
// import ACTIONS from "../Action"
const ACTIONS = require("./src/Action");
const app = express();
const server = http.createServer(app);

const userSocketMap = {};
// Initialize Socket.io server

function getAllConnectedClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(
    (socketId) => {
      return {
        socketId,
        username: userSocketMap[socketId],
      };
    }
  );
}
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// Use CORS middleware
app.use(cors());

// Handle socket connections
io.on("connection", (socket) => {
  console.log("A socket connected:", socket.id);

  socket.on(ACTIONS.JOIN, ({ roomId, username }) => {
    userSocketMap[socket.id] = username;

    socket.join(roomId);
    const clients = getAllConnectedClients(roomId);

    console.log(clients);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketId: socket.id,
      });
    });
  });




    socket.on(ACTIONS.CODE_CHANGE,({roomId,code}) =>{
      socket.in(roomId).emit(ACTIONS.CODE_CHANGE,{code})
    })


    socket.on(ACTIONS.SYNC_CODE, (payload) => {
      if (payload && payload.socketId && payload.code) {
        const { socketId, code } = payload;
        io.to(socketId).emit(ACTIONS.CODE_CHANGE, { code });
      } else {
        console.error('Invalid payload received for ACTIONS.SYNC_CODE:', payload);
      }
    });
    

  socket.on('disconnecting',()=>{
    const rooms=[...socket.rooms]

    rooms.forEach((roomId)=>{
      socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
        socketId:socket.id,
        username:userSocketMap[socket.id]
      })
    })

    delete userSocketMap[socket.id]
    socket.leave()
  })


});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
