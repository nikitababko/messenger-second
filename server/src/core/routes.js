const express = require('express');
const { catchErrors } = require('../handlers/errorHandlers');
const UserController = require('../controllers/UserController');

const createRouters = (app) => {
  app.use(express.json());

  app.post('/user/login', catchErrors(UserController.login));
  app.post('/user/register', catchErrors(UserController.register));
};

module.exports = createRouters;
