const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppoinmentSchema = new Schema({
    appoinment_date: {
        type: String,
        required: true
    },
    appoinment_time: {
        type: String,
        required: true
    },
    doctor_details: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    user_details: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

// Create a index to enforce uniqueness on the combination of date and time
AppoinmentSchema.index({ appoinment_date: 1, appoinment_time: 1 }, { unique: true });

module.exports = mongoose.model('Appoinment', AppoinmentSchema);
