// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const { connectToDatabase, getDb } = require('./config/db');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// connectToDatabase();

// // Test database connection route
// app.get('/test-db', async (req, res) => {
//   try {
//     const db = getDb();
//     const doctorCount = await db.collection('doctor-data').countDocuments();
//     const patientCount = await db.collection('patient-data').countDocuments();
//     const appointmentCount = await db.collection('appointments').countDocuments();
    
//     res.json({
//       message: 'Database connection successful',
//       doctorCount,
//       patientCount,
//       appointmentCount
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Database connection failed', error: error.message });
//   }
// });

// // Routes
// const patientRoutes = require('./routes/patientRoutes');
// const doctorRoutes = require('./routes/doctorRoutes');
// const appointmentRoutes = require('./routes/appointmentRoutes');

// app.use('/api/patients', patientRoutes);
// app.use('/api/doctors', doctorRoutes);
// app.use('/api/appointments', appointmentRoutes);

// // Catch-all route for undefined routes
// app.use('*', (req, res) => {
//   res.status(404).json({ message: 'Route not found' });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ 
//     message: 'Something went wrong!', 
//     error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
//   });
// });

// // Start the server
// const server = app.listen(PORT, () => {
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
// });

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });




//backend to frontend connection
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { connectToDatabase, getDb } = require('./config/db');
const path = require('path');
const doctorRoutes = require('./routes/doctorRoutes');

const app = express();
const PORT = process.env.PORT || 5000;


// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/doctors', doctorRoutes);
// Connect to MongoDB
connectToDatabase().then(() => {
  // Routes
  const patientRoutes = require('./routes/patientRoutes');
  const doctorRoutes = require('./routes/doctorRoutes');
  const appointmentRoutes = require('./routes/appointmentRoutes');

  app.use('/api/patients', patientRoutes);
  app.use('/api/doctors', doctorRoutes);
  app.use('/api/appointments', appointmentRoutes);

  // Test database connection route
  app.get('/test-db', async (req, res) => {
    try {
      const db = getDb();
      const doctorCount = await db.collection('doctor-data').countDocuments();
      const patientCount = await db.collection('patient-data').countDocuments();
      const appointmentCount = await db.collection('appointments').countDocuments();
      
      res.json({
        message: 'Database connection successful',
        doctorCount,
        patientCount,
        appointmentCount
      });
    } catch (error) {
      res.status(500).json({ message: 'Database connection failed', error: error.message });
    }
  });

  // Catch-all route for undefined routes
  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Route not found' });
  });

  // Error handling middleware
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ 
      message: 'Something went wrong!', 
      error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
    });
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to the database:', error);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  process.exit(1);
});

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));