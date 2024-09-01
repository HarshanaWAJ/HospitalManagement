const express = require('express');
const router = express.Router();

const {
    addAppoinment,
    getAllAppoinments,
    getAppoinmentsFromUser
} = require('../controllers/AppoinmentController')

//Routes
router.post('/add-appoinment', addAppoinment);
router.get('/get-appoinment-list', getAllAppoinments);
router.get('/appoinments-from-user/:user_id', getAppoinmentsFromUser);

module.exports = router;