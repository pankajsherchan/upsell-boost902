const express = require('express');

const postInfoController = require('../controllers/post-info');
const router = express.Router();

router.use(express.json());

router.post('/', postInfoController.addPostInfo);
router.get('/', postInfoController.getPostInfo);

module.exports = router;
