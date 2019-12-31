const express = require('express');

const usersController = require('../controllers/users');

const router = express.Router();

router.use(express.json());

router.get('/', usersController.getUsers);

router.post('/signUp', usersController.signUp);

router.post('/', usersController.addUser);

router.get('/:uid', usersController.getUserById);

router.put('/', usersController.editUser);

router.delete('/:uid', usersController.deleteUser);

module.exports = {
  router: router
};
