const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
});

module.exports = mongoose.model('Chatroom', ChatroomSchema);
