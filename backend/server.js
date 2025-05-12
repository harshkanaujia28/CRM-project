const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const reportRoutes = require('./routes/reportRoutes');
const customerComplaintRoutes = require('./routes/customerComplaintRoutes');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io'); 
dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // HTTP server 

const io = new Server(server, {
  cors: {
    origin: '*', // frontend  URL 
    methods: ['GET', 'POST'],
  },
});

// Save `io` globally if needed
global.io = io;

// Socket.IO events
io.on('connection', (socket) => {
  console.log('⚡ New client connected: ' + socket.id);

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected: ' + socket.id);
  });
});

app.use(cors());
app.use(express.json());

app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/customer-complaints', customerComplaintRoutes);

app.get('/', (req, res) => {
  res.send('CRM API Running...');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server is running `));



