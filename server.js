const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
// const cors = require('cors');
const path = require("path");
app.use("/public", express.static(path.join(__dirname, "public")));


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000
const DB_URI = process.env.DB_URI

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'weelcome api'
  })
})

app.use('/', require('./routes/router'));



const Main = async () => {
  try {
    await mongoose.connect(DB_URI);


    app.listen(PORT, async () => {

      console.log(`Server started ON ${PORT}`)
    });
  } catch (error) {
    console.log(error);
  }
};

Main();




//socket.code
// const io = require('socket.io')(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST']
//   }
// })

// const User = require('./models/User');

// const Message = require('./models/Message');
// const { Server } = require('http');
// const rooms = ['general', 'tech', 'finance', 'crypto'];
// async function getLastMessagesFromRoom(room) {
//   let roomMessages = await Message.aggregate([
//     { $match: { to: room } },
//     { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } }
//   ])
//   return roomMessages;
// }

// function sortRoomMessagesByDate(messages) {
//   return messages.sort(function (a, b) {
//     let date1 = a._id.split('/');
//     let date2 = b._id.split('/');

//     date1 = date1[2] + date1[0] + date1[1]
//     date2 = date2[2] + date2[0] + date2[1];

//     return date1 < date2 ? -1 : 1
//   })
// }

// // socket connection

// io.on('connection', (socket) => {

//   socket.on('new-user', async () => {
//     const members = await User.find();
//     io.emit('new-user', members)
//   })


//   socket.on('join-room', async (newRoom, previousRoom) => {
//     socket.join(newRoom);
//     socket.leave(previousRoom);
//     let roomMessages = await getLastMessagesFromRoom(newRoom);
//     roomMessages = sortRoomMessagesByDate(roomMessages);
//     socket.emit('room-messages', roomMessages)
//   })

//   socket.on('message-room', async (room, content, sender, time, date) => {
//     const newMessage = await Message.create({ content, from: sender, time, date, to: room });
//     let roomMessages = await getLastMessagesFromRoom(room);
//     roomMessages = sortRoomMessagesByDate(roomMessages);
//     // sending message to room
//     io.to(room).emit('room-messages', roomMessages);
//     socket.broadcast.emit('notifications', room)
//   })



//   app.delete('/logout', async (req, res) => {
//     try {
//       const { _id, newMessages } = req.body;
//       const user = await User.findById(_id);
//       user.status = "offline";
//       user.newMessages = newMessages;
//       await user.save();
//       const members = await User.find();
//       socket.broadcast.emit('new-user', members);
//       res.status(200).send();
//     } catch (e) {
//       console.log(e);
//       res.status(400).send()
//     }
//   })

// })


// app.get('/rooms', (req, res) => {
//   res.json(rooms)
// })

