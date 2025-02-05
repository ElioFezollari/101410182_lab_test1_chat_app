const express = require('express');
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const socketIO = require('socket.io');
const app = express();
const authRoutes = require('./auth');
const cors = require('cors');
const GroupMessage = require("./models/GroupMessage")
const DmMessage = require("./models/DmMessage")

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));

app.use(express.json());
app.use('/auth', authRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

const server = app.listen(3000, () => {
  console.log(`Socket server running at http://localhost:3000`);
});

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`New Socket connection: ${socket.id}`);

  socket.on('disconnect', (reason) => {
    console.log(`Client disconnected ${socket.id}: ${reason}`);
  });

  socket.on('message', (data) => {
    console.log(`Data from ${socket.id}: ${data}`);
    socket.send("Hello from Server");
  });

  socket.on('chat_message', async (data) => {
    if (data.receiver) {
      console.log(`Received DM message from ${data.sender}:`, data);
  
      const dmMessage = new DmMessage({
        from_user: data.sender,
        to_user: data.receiver,
        message: data.message,
      });


  
      try {
        await dmMessage.save();
        console.log('Message saved to database:', dmMessage);
  
        io.to(data.receiver).emit('chat_message', data);
  
      } catch (error) {
        console.error('Error saving message to database:', error);
      }
    } else if (data.group) {
      console.log(`Received group message for group ${data.group}:`, data);
  
      const groupMessage = new GroupMessage({
        from_user: data.sender,
        room: data.group,
        message: data.message,
      });
  
      try {
        await groupMessage.save();
        console.log('Message saved to database:', groupMessage);
  
        io.to(data.group).emit('chat_message', data);
  
      } catch (error) {
        console.error('Error saving message to database:', error);
      }
    }
  });
  
  socket.on('join_group', (groupName) => {
    console.log(`${socket.id} joined ${groupName}`);
    socket.join(groupName);
  });

  socket.on('group_message', (data) => {
    console.log(`Received group message: ${JSON.stringify(data)}`);
    io.to(data.group_name).emit('group_message', data);
  });

  socket.on('join_group', (groupName) => {
    console.log(`${socket.id} joined group: ${groupName}`);
    socket.join(groupName);
  });

  socket.on('leave_group', (groupName) => {
    console.log(`${socket.id} left group: ${groupName}`);
    socket.leave(groupName);
  });

  socket.on('join_user', (username) => {
    console.log(`${socket.id} joined DM with: ${username}`);
    socket.join(username);  
  });

  socket.on('leave_user', (username) => {
    console.log(`${socket.id} left DM with: ${username}`);
    socket.leave(username); 
  });
});
