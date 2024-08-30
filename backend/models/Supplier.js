const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const supplierSchema = new Schema ({
    supplier_id: {
        type: String,
        required: true
    },
    supplier_company: {
        type: String,
        required: true
    },
    supplier_address: {
        type: String,
        required: true
    },
    supplier_contact_person: {
        type: String,
        required: true
    },
    supplier_contact_no: {
        type: String,
        required: true
    },
    supplier_country: {
        type: String,
        required: true
    },
    contract_start_date: {
        type: String,
        required: true
    },
    contract_end_date: {
        type: String,
        required: true
    },
    supplier_note: {
        type: String
    },
});

module.exports = mongoose.model('Supplier', supplierSchema);