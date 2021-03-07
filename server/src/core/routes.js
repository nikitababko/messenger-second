const express = require('express');

const { catchErrors } = require('../handlers/errorHandlers');
const UserController = require('../controllers/UserController');
const ChatroomController = require('../controllers/ChatroomController');
const auth = require('../middlewares/auth');

const createRouters = (app) => {
  app.use(express.json());

  app.post('/user/login', catchErrors(UserController.login));
  app.post('/user/register', catchErrors(UserController.register));

  app.get('/chatroom', catchErrors(ChatroomController.getAllChatrooms));
  app.post('/chatroom', catchErrors(ChatroomController.createChatroom));
};

module.exports = createRouters;
