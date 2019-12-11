const express = require('express');

const comparisonController = require('../controllers/comparison');
const router = express.Router();

router.use(express.json());

router.get('/', comparisonController.getComparisonData);

module.exports = router;
