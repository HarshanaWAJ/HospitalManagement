const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sellSchema = new Schema ({
    patient_name: {
        type: String,
        required: true
    },
    bill_id: {
        type: String,
        required: true,
        unique: true
    },
    items: {
        type: [String],
        required: true
    },
    quantity: {
        type:[Number],
        required: true
    },
    prices: {
        type: [Number],
        required: true
    },
    bill_date: {
        type: String,
        required: true
    },
    total_price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Sell', sellSchema);