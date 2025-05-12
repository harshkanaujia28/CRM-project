const express = require('express');
const router = express.Router();
const { createComplaint, getAllComplaints, getComplaintById ,updateComplaintStatus,deleteComplaint} = require('../controllers/customerComplaintController');
const { protect, isAdminOrStaff } = require('../middleware/authMiddleware');

//  POST complaint (Public or protected, your choice)
router.post('/', createComplaint);

//  GET all complaints (Staff/Admin only)
router.get('/', protect, isAdminOrStaff, getAllComplaints);

//  GET single complaint by ID
router.get('/:id', protect, isAdminOrStaff, getComplaintById);

// DELETE route
router.delete('/:id', protect, isAdminOrStaff, deleteComplaint);

// PUT update complaint status (Staff/Admin only)
router.put('/:id/status', protect, isAdminOrStaff, updateComplaintStatus);


module.exports = router;
