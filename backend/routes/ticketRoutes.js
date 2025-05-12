const express = require('express');
const {
    createTicket,
    getAssignedTickets,
    deleteTicket,
    getAllTickets,
    updateTicketByAdmin,
    markTicketResolved,
    closeTicketByStaff,
    getCustomerTickets,
    getTicketById,
    setTicketInProgress
   
} = require('../controllers/ticketController');

const {
    protect,
    isAdmin,
    isTechnician,
    isAdminOrStaff,
    isCustomer,
    // isTechnicianOrstaff
} = require('../middleware/authMiddleware');

const router = express.Router();

// create a new ticket-staff/admin
router.post('/', protect, isAdminOrStaff, createTicket);

// get all tickets - admin/staff
router.get('/', protect, isAdminOrStaff, getAllTickets);

// get all tickets assigned to a technician
router.get('/my-tickets', protect, getAssignedTickets);

// get all tickets assigned to a customer
// router.get('/ticket', protect, isCustomer, getCustomerTickets)

// get a ticket by id - admin/staff/technician/customer
router.get('/:id', protect, getTicketById);

// update ticket - admin/staff
router.put('/:id', protect, isAdminOrStaff, updateTicketByAdmin);

// delete ticket - admin
router.delete('/:id', protect, isAdmin, deleteTicket);

// update ticket status - technician
router.put('/:id/resolve', protect, isTechnician, markTicketResolved);
router.put('/:id/in-progress', protect,isTechnician, setTicketInProgress);

// update ticket status - staff
router.put('/:id/close', protect, isAdminOrStaff, closeTicketByStaff)



module.exports = router;