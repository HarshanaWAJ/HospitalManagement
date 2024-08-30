const mongoose = require('mongoose');
const User = require('../models/User');
const Schema = mongoose.Schema;

const DoctorSchema = new Schema ({
    doctor_id: {
        type: String,
        required: true
    },
    user_details: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    qualifications: {
        type: [String],
        required: true
    },
    medical_license_number: {
        type: String,
        unique: true,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    employment_type: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Doctor', DoctorSchema);