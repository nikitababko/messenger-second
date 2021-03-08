const jwt = require('jwt-then');
const app = require('./app');
const Message = require('./models/Message');
const User = require('./models/User');

require('dotenv').config();

// Set up server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Server has started on port ${PORT}`);
});

const io = require('socket.io')(server);

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = payload.id;

    next();
  } catch (error) {}
});

io.on('connection', (socket) => {
  console.log(`Connected: ${socket.userId}`);

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.userId}`);
  });

  socket.on('JOIN_ROOM', ({ chatroomId }) => {
    socket.join(chatroomId);
    console.log(`A user joined chatroom: ${chatroomId}`);
  });

  socket.on('LEAVE_ROOM', ({ chatroomId }) => {
    socket.leave(chatroomId);
    console.log(`A user left chatroom: ${chatroomId}`);
  });

  socket.on('CHATROOM_MESSAGE', async ({ chatroomId, message }) => {
    if (message.trim().length > 0) {
      const user = await User.findOne({ _id: socket.userId });
      const newMessage = new Message({
        chatroom: chatroomId,
        user: socket.userId,
        message,
      });
      io.to(chatroomId).emit('NEW_MESSAGE', {
        message,
        name: user.name,
        userId: socket.userId,
      });

      await newMessage.save();
    }
  });
});

// Connect to mongoDB
require('./core/db');
