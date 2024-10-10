const { getDb } = require('../config/db');
const { ObjectId } = require('bson');

exports.createAppointment = async (req, res) => {
    try {
      const db = getDb();
      const { doctorId, date, time } = req.body;
      const patientId = req.user.id;
  
      const result = await db.collection('appointments').insertOne({ 
        patientId: ObjectId.createFromHexString(patientId), 
        doctorId: ObjectId.createFromHexString(doctorId), 
        date, 
        time,
        status: 'scheduled',
        createdAt: new Date()
      });
  
      res.status(201).json({ message: 'Appointment created successfully', appointmentId: result.insertedId });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ message: 'Error creating appointment', error: error.message });
    }
  };
  
  exports.getAppointments = async (req, res) => {
    try {
      const db = getDb();
      const userId = ObjectId.createFromHexString(req.user.id);
      const userType = req.user.type;
  
      let query;
      if (userType === 'patient') {
        query = { patientId: userId };
      } else if (userType === 'doctor') {
        query = { doctorId: userId };
      } else {
        return res.status(400).json({ message: 'Invalid user type' });
      }
  
      const appointments = await db.collection('appointments').find(query).toArray(); // Fix: 'appointment' to 'appointments'
  
      res.status(200).json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ message: 'Error fetching appointments', error: error.message });
    }
  };

  exports.updateAppointment = async (req, res) => {
    try {
      const db = getDb();
      const { id } = req.params;
      const { status } = req.body;

      const result = await db.collection('appointments').updateOne(
        { _id: ObjectId.createFromHexString(id) },
        { $set: { status } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      res.json({ message: 'Appointment updated successfully' });
    } catch (error) {
      console.error('Error updating appointment:', error);
      res.status(500).json({ message: 'Error updating appointment', error: error.message });
    }
  };