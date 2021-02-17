require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', (err) => {
  console.log('Mongoose connection ERROR: ' + err.message);
});

mongoose.connection.once('open', () => {
  console.log('MongoDB connected');
});
// Import modules
require('./models/User');
require('./models/Chatroom');
require('./models/Message');

const app = require('./app');

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Server has started on port ${PORT}`);
});
