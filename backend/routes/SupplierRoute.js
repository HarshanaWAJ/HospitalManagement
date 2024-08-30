const express = require('express');

const router = express.Router();

const {
    addSupplierDetails,
    getAllSuppliers,
    getSupplierDetails,
    updateSupplierById,
    searchSupplier
} = require('../controllers/SupplierController')

//Routes
router.post('/add-supplier', addSupplierDetails);
router.get('/supplier-list', getAllSuppliers);
router.get('/supplier-details/:id', getSupplierDetails);
router.put('/update-supplier/:id', updateSupplierById);
router.get('/search-supplier', searchSupplier);

module.exports = router;