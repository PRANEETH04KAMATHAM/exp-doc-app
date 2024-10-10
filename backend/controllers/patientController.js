const { getDb } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('bson');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

exports.registerPatient = async (req, res) => {
	console.log('Received registration request:', req.body);
	try {
		// Remove or comment out this section completely
		// const { password, confirmPassword } = req.body;
		// if (password !== confirmPassword) {
		//   return res.status(400).json({ message: 'Passwords do not match' });
		// }

		// Handle file upload
		let profileImagePath = null;
		if (req.file) {
			profileImagePath = req.file.path;
		}

		// Hash the password before saving
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// Create new patient object
		const newPatient = {
			...req.body,
			password: hashedPassword,
			profileImage: profileImagePath,
		};

		console.log('New patient data:', newPatient);

		// Save to database
		const db = getDb();
		const result = await db.collection('patient-data').insertOne(newPatient);

		res.status(201).json({ message: 'Patient registered successfully', patientId: result.insertedId });
	} catch (error) {
		console.error('Error in patient registration:', error);
		res.status(500).json({ message: 'Error registering patient', error: error.message });
	}
};

exports.loginPatient = async (req, res) => {
    try {
      const db = getDb();
      const { email, password } = req.body;
      
      const patient = await db.collection('patient-data').findOne({ email });
      
      if (!patient) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await bcrypt.compare(password, patient.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ user: { id: patient._id, type: 'patient' } }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ 
        message: 'Patient logged in successfully', 
        token, 
        userId: patient._id,
        name: patient.name,
        email: patient.email,
        profileImage: patient.profileImage
      });
    } catch (error) {
      console.error('Error in patient login:', error);
      res.status(500).json({ message: 'Error logging in', error: error.message });
    }
  };

exports.getPatientProfile = async (req, res) => {
	try {
		const db = getDb();
		const patient = await db.collection('patient-data').findOne({ _id: ObjectId.createFromHexString(req.user.id) });
	
		if (!patient) {
			return res.status(404).json({ message: 'Patient not found' });
		}
	
		// Remove sensitive information
		delete patient.password;
	
		res.json(patient);
	} catch (error) {
		console.error('Error fetching patient profile:', error);
		res.status(500).json({ message: 'Error fetching patient profile', error: error.message });
	}
};

exports.updatePatientProfile = async (req, res) => {
	try {
		const db = getDb();
		const { name, contactNumber, age, gender, address } = req.body;

		const result = await db.collection('patient-data').updateOne(
			{ _id: ObjectId.createFromHexString(req.user.id) },
			{ $set: { name, contactNumber, age, gender, address } }
		);

		if (result.matchedCount === 0) {
			return res.status(404).json({ message: 'Patient not found' });
		}

		res.json({ message: 'Patient profile updated successfully' });
	} catch (error) {
		console.error('Error updating patient profile:', error);
		res.status(500).json({ message: 'Error updating patient profile', error: error.message });
	}
};