'use strict';

const express = require('express');

const router = express.Router();
const UsersController = require('../../Interface_adapters/controllers/UserController');

router.get('/', async (req, res, next) => {
  // Tengo que averiguar el role y el id para mandarselo
  const listUser = await UsersController.listUser(1, 'AdminS');
  console.log(listUser);
  res.send(listUser);
});

module.exports = router;
