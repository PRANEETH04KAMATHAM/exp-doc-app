const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const auth = require('../middleware/auth'); // Add this line

router.post('/register', upload.single('profileImage'), patientController.registerPatient);
router.post('/login', (req, res, next) => {
    console.log('Login request received:', req.body);
    patientController.loginPatient(req, res, next);
  });
router.get('/profile', auth, patientController.getPatientProfile);
router.put('/profile', auth, patientController.updatePatientProfile);

module.exports = router;