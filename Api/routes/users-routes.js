const express = require('express');

const usersController = require('../controllers/users-controller');

const router = express.Router();

router.use(express.json());

//Get All Users
router.get('/', usersController.getAllUsers);

//Create User Or SignUp
router.post('/signUp', usersController.createUser);

//Get User by id
router.get('/:uid', usersController.getUserById);

//Edit User Profile
router.put('/', usersController.editUser);

//DELETE user
router.delete('/:uid', usersController.deleteUser);

module.exports = {
  router: router
};
