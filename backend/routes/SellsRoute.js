const express = require('express');

const router = express.Router();

const {
    addSell,
    getAllSells
} = require('../controllers/SellController'); 

//Routes
router.post('/add-sells', addSell);
router.get('/get-sells-details', getAllSells);

module.exports = router;