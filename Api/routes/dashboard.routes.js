const express = require('express');

const dashboardController = require('../controllers/dashboard');
const router = express.Router();

router.use(express.json());

router.get('/', dashboardController.getUpsellSummary);
router.get('/info', dashboardController.getDashboardInfo);

module.exports = router;
