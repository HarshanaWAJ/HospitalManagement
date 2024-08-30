const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const drugSchema = new Schema({
    commercial_name: {
        type: String,
        required: true,
    },
    generic_name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true,
    },
    ingredients: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    cost_per_unit: {
        type: Number,
        required: true
    },
    sell_price_per_unit: {
        type: Number,
        required: true
    }, 
    manufacture_date: {
        type: String,
        required: true
    },
    expiry_date: {
        type: String,
        required: true
    },
    supplier_id: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Drug', drugSchema);