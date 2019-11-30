const express = require('express');

const rolesController = require('../controllers/roles-controller');

const router = express.Router();

router.use(express.json());

//Get All Roles
router.get('/', rolesController.getAllRoles);

router.post('/', rolesController.createRole);

module.exports = router;
