const express = require('express');
const jwt = require('jsonwebtoken');

let config = require('./config');
const users = require('../routes/users.routes');
const User = require('../models/user');

const checkUser = async (email, password) => {
  let result = false;
  const user = await User.findOne({ email: email });
  if (user) {
    if (user.password === password) {
      result = true;
    }
  }
  return result;
};

const login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  if (email && password) {
    if (await checkUser(email, password)) {
      let token = jwt.sign({ email: email }, config.secret, {
        expiresIn: '24h'
      });
      res.json({
        success: true,
        message: 'Authentication successful',
        token: token
      });
    } else {
      const error = new Error(
        'Authentication failed! Email or password is not correct.'
      );
      error.code = 400;
      return next(error);
    }
  }
};

const index = (req, res) => {
  res.json({
    success: true,
    message: 'Index Page'
  });
};

module.exports = {
  login: login,
  index: index
};
