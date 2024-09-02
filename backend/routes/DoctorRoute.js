const express = require('express');
const router = express.Router();

const {
    addDoctorDetails,
    getDoctorDetails,
    getSelectedDoctorDetails,
    updateDoctorById,
    doctorDeleteById,
    getDoctorDetailsBySpecialization
} = require('../controllers/DoctorController');

// Routes for Doctor
router.post('/add-doctor', addDoctorDetails);
router.get('/get-doctor-details', getDoctorDetails);
router.get('/get-doctor-selected-details', getSelectedDoctorDetails);
router.put('/update-doctor/:id', updateDoctorById);
router.delete('/delete-doctor/:id', doctorDeleteById);
router.get('/get-doctor-details-by-specialize', getDoctorDetailsBySpecialization);

module.exports = router;
