const mongoose = require('mongoose');

const Role = require('../models/role');

const getAllRoles = async (req, res, next) => {
  let roles;

  try {
    roles = await Role.find();
  } catch (err) {
    const error = new Error('Something went wrong, roles cannot be found');
    error.code = 500;
    return next(error);
  }

  res.json({ roles: roles.map(role => role.toObject({ getters: true })) });
};

const createRole = async (req, res, next) => {
  const { role, users } = req.body;

  const createdRole = new Role({
    role,
    users
  });

  try {
    await createdRole.save();
  } catch (err) {
    const error = new Error('Role could not be created, please try again!');
    error.code = 500;
    return next(error);
  }

  res.json({ createdRole: createdRole.toObject({ getters: true }) });
};

exports.getAllRoles = getAllRoles;
exports.createRole = createRole;
