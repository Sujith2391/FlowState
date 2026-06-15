const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const aiRoutes = require('./routes/aiRoutes');
const taskRoutes = require('./routes/taskRoutes');
const workspaceRoutes = require('./routes/workspaceRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const documentRoutes = require('./routes/documentRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authMiddleware = require('./middleware/authMiddleware');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// CORS configuration for production & local development
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true); // Allow all Vercel/Render preview URLs dynamically
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', authMiddleware, aiRoutes);
app.use('/api/tasks', authMiddleware, taskRoutes);
app.use('/api/workspaces', authMiddleware, workspaceRoutes);
app.use('/api/analytics', authMiddleware, analyticsRoutes);
app.use('/api/documents', authMiddleware, documentRoutes);
app.use('/api/notifications', authMiddleware, notificationRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Socket.io integration
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Real-time task dragging
  socket.on('taskMoved', (data) => {
    // Broadcast to all OTHER clients
    socket.broadcast.emit('taskUpdated', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'FlowState AI API is running' });
});

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/flowstateai')
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB', err);
    // Even if mongo fails in local testing, start server for dev
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without MongoDB)`);
    });
  });
