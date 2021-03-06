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
