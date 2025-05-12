const Ticket = require('../models/Ticket');
const mongoose = require('mongoose');

const getTicketReports = async (req, res) => {
  try {
    const { from, to, status, assignedTo } = req.query;

    const filter = {};

    // Filter by date range
    if (from || to) {
      filter.createdAt = {};
      if (from) filter.createdAt.$gte = new Date(from);
      if (to) filter.createdAt.$lte = new Date(to);
    }

    // Filter by status
    if (status) {
      filter.status = status;
    }

    // Filter by technician
    if (assignedTo && mongoose.Types.ObjectId.isValid(assignedTo)) {
      filter.assignedTo = assignedTo;
    }

    const tickets = await Ticket.find(filter)
      .populate('assignedTo', 'name email') // optional
      .populate('createdBy', 'name email');

    res.status(200).json({
      total: tickets.length,
      tickets,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error while fetching reports' });
  }
};
module.exports = { getTicketReports };
