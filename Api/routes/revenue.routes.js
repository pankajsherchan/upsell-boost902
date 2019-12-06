const express = require('express');

const revenueController = require('../controllers/revenue');
const router = express.Router();

router.use(express.json());

router.get('/', revenueController.getRevenueByDays);

module.exports = router;
