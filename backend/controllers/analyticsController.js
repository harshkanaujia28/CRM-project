const Ticket = require('../models/Ticket');
const User = require('../models/User');

// GET /api/analytics/summary
const getAnalyticsSummary = async (req, res) => {
  try {
    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: 'open' });
    const inProgressTickets = await Ticket.countDocuments({ status: 'in-progress' });
    const closedTickets = await Ticket.countDocuments({ status: 'closed' });
    const totalTechnicians = await User.countDocuments({ role: 'technician' });
    // const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalStaff = await User.countDocuments({role:"staff"})

    res.status(200).json({
      totalTickets,
      openTickets,
      inProgressTickets,
      closedTickets,
      totalTechnicians,
      totalStaff,
      // totalCustomers
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get analytics summary' });
  }
};

// GET /api/analytics/tickets-per-technician
const getTicketsPerTechnician = async (req, res) => {
  try {
    const result = await Ticket.aggregate([
      {
        $group: {
          _id: '$assignedTo',
          ticketCount: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'technician'
        }
      },
      {
        $unwind: '$technician'
      },
      {
        $project: {
          technicianName: '$technician.name',
          ticketCount: 1
        }
      }
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to get tickets per technician' });
  }
};

module.exports = {
  getAnalyticsSummary,
  getTicketsPerTechnician,
};
