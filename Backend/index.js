const express = require('express');
require('dotenv').config()
const { default: mongoose } = require('mongoose');
const socketIO = require('socket.io')
const app = express()
const authRoutes = require('./auth');

const cors = require('cors');

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

const server = app.listen(3000,()=>{
    console.log(`Socket server running at http://localhost:3000`)
})


// const io = socketIO(server)

// const admin = io.of('/')

// app.get('/',(req,res)=>{
//     res.sendFile(__dirname + '/views/chat.html')
// })
// app.get('/group_chat',(req,res)=>{
//     res.sendFile(__dirname + '/views/group_chat.html')
// })
// app.get

// io.on('connection',(socket)=>{
//     console.log(`New Socket connection: ${socket.id}`)
//     socket.on('disconnect',(reason)=>{
//         console.log(`Client disconnected ${socket.id}: ${reason}`)
//     })
//     socket.on('message',(data)=>{
//         console.log(`Data from ${socket.id}: ${data}`)
//         socket.send("Hello from Server")
//     })
//     socket.on('chat_message',(data)=>{
//         data.senderId = socket.id
//         console.log(JSON.stringify(data))
//         // socket.emit("chat_message",data)
//         // io.emit('chat_message',data)
//         socket.broadcast.emit("chat_message",data)
//         socket.on('group_message',(data)=>{  
//             console.log(JSON.stringify(data))
//             io.to(data.group_name).emit('group_message',data)
//         })
//         socket.on('join_group',(groupName)=>{
//             console.log(`${socket.id} joined ${groupName}`)
//             socket.join(groupName)
//         })
//         socket.on('leave_group',(groupName)=>{
//             console.log(`${socket.id} left ${groupName}`)
//             socket.leave(groupName)
//         })
//     })
// })
