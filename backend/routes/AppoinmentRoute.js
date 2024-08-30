const express = require('express');
const router = express.Router();

const {
    addAppoinment,
    getAllAppoinments,
    getDoctorAppoinments
} = require('../controllers/AppoinmentController')

//Routes
router.post('/add-appoinment', addAppoinment);
router.get('/get-appoinment-list', getAllAppoinments);
router.get('/appoinments-to-doctor/:user_id', getDoctorAppoinments);

module.exports = router;