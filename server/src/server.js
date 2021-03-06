const app = require('./app');

require('dotenv').config();

// Import modules
require('./models/User');
require('./models/Chatroom');
require('./models/Message');

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    throw Error(err);
  }
  console.log(`Server has started on port ${PORT}`);
});

require('./core/db');
