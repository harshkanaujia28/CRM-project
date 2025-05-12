const mongoose = require('mongoose');

const customerComplaintSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  productName: { type: String, required: true },
  serialNumber: { type: String, required: true },
  dateOfPurchase: { type: Date, required: true },
  issueDescription: { type: String, required: true },
  // billImage: { type: String }, 
  createdAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ['Pending', 'Ticket Created', 'Closed'],
    default: 'Pending',
  }
});

module.exports = mongoose.model('CustomerComplaint', customerComplaintSchema);
