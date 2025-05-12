const express = require('express');
const { getAnalyticsSummary, getTicketsPerTechnician } = require('../controllers/analyticsController');
const router = express.Router();
const { protect ,isAdminOrStaff} = require('../middleware/authMiddleware');

router.get('/summary', protect, isAdminOrStaff,getAnalyticsSummary);
router.get('/tickets-per-technician', protect, isAdminOrStaff,getTicketsPerTechnician);

module.exports = router;
