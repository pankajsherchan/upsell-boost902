const express = require('express');

const performanceController = require('../controllers/performance');
const router = express.Router();

router.use(express.json());

router.get('/', performanceController.getComparisonByColleague);

module.exports = router;
