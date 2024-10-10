const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctorController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/register', upload.single('profileImage'), doctorController.registerDoctor);
router.post('/login', (req, res, next) => {
    console.log('Login request received:', req.body);
    doctorController.loginDoctor(req, res, next);
  });
router.get('/profile', auth, doctorController.getDoctorProfile);
router.put('/profile', auth, doctorController.updateDoctorProfile);

module.exports = router;