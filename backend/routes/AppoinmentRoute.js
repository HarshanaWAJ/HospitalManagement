const express = require('express');
const router = express.Router();

const {
    addAppoinment,
    getAllAppoinments,
    getAppoinmentsFromUser,
    getAppoinmentsFromDoctor,
    deleteAppoinmentById
} = require('../controllers/AppoinmentController')

//Routes
router.post('/add-appoinment', addAppoinment);
router.get('/get-appoinment-list', getAllAppoinments);
router.get('/appoinments-from-user/:user_id', getAppoinmentsFromUser);
router.get('/appoinments-from-doctor/:doctor_id', getAppoinmentsFromDoctor);
router.delete('/delete-appoinment/:id', deleteAppoinmentById);

module.exports = router;