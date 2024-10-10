const { getDb } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ObjectId } = require('bson');

exports.registerDoctor = async (req, res) => {
	console.log('Received doctor registration data:', req.body);
	console.log('Received file:', req.file);
	try {
		const db = getDb();
		const { name, email, password, contactNumber, age, gender, specialization, hospitalName } = req.body;
		
		// Log each field to check for undefined values
		console.log('Name:', name);
		console.log('Email:', email);
		console.log('Password:', password ? 'Provided' : 'Not provided');
		console.log('Contact Number:', contactNumber);
		console.log('Age:', age);
		console.log('Gender:', gender);
		console.log('Specialization:', specialization);
		console.log('Hospital Name:', hospitalName);

		// Check if all required fields are provided
		if (!name || !email || !password || !contactNumber || !age || !gender || !specialization || !hospitalName) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		// Ensure password is a string
		if (typeof password !== 'string') {
			return res.status(400).json({ message: 'Invalid password format' });
		}

		const existingDoctor = await db.collection('doctor-data').findOne({ email });
		if (existingDoctor) {
			return res.status(400).json({ message: 'Doctor already exists with this email' });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		
		const newDoctor = {
			name,
			email,
			password: hashedPassword,
			contactNumber,
			age: parseInt(age, 10), // Ensure age is stored as a number
			gender,
			specialization,
			hospitalName,
			profileImage: req.file ? req.file.path : null,
			createdAt: new Date()
		};

		const result = await db.collection('doctor-data').insertOne(newDoctor);
		console.log('Doctor registered:', result.insertedId);
		
		const token = jwt.sign({ user: { id: result.insertedId, type: 'doctor' } }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(201).json({ message: 'Doctor registered successfully', token });
	} catch (error) {
		console.error('Error in doctor registration:', error);
		res.status(500).json({ message: 'Error registering doctor', error: error.message, stack: error.stack });
	}
};
