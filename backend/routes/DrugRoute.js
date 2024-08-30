const express = require('express');


const router = express.Router();

const {
    addDrugDetails,
    getAllDrugs,
    getDrugDetails,
    updateDrug,
    searchDrugs
} = require('../controllers/DrugController')

//Routes
router.post('/add-drug', addDrugDetails);
router.get('/drug-list', getAllDrugs);
router.get('/drug-details/:id', getDrugDetails);
router.put('/drug-details-update/:id', updateDrug);
router.get('/search', searchDrugs);

module.exports = router;