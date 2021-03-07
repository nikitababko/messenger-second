const jwt = require('jwt-then');
const app = require('./app');

require('dotenv').config();

// Import modules
// require('./models/User');
// require('./models/Chatroom');
// require('./models/Message');

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
});

// Connect to mongoDB
require('./core/db');
