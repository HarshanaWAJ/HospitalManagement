const Appoinment = require("../models/Appoinment");
const Doctor = require("../models/Doctor");
const User = require("../models/User");

exports.addAppoinment = async (req, res) => {
    const {
        appoinment_date,
        appoinment_time,
        doctor_id,
        user_email
    } = req.body;

    try {
        // Check if an appointment already exists with the same date and time
        let existingAppoinment = await Appoinment.findOne({ appoinment_date, appoinment_time });
        if (existingAppoinment) {
            return res.status(409).send("Appointment time is already taken"); // Return to stop further execution
        }

        // Find the doctor by first name and last name
        let doctor = await Doctor.findOne({
            doctor_id
        });

        if (!doctor) {
            return res.status(404).send('Doctor not found'); // Return to stop further execution
        }

        // Find the user by email
        let user = await User.findOne({ email: user_email });

        if (!user) {
            return res.status(404).send('User not found'); // Return to stop further execution
        }

        // Create and save the new appointment
        const appoinment = new Appoinment({
            appoinment_date,
            appoinment_time,
            doctor_details: doctor._id,
            user_details: user._id
        });

        await appoinment.save();
        return res.status(200).json({ appoinment }); // Use res.json to return JSON response

    } catch (error) {
        console.log(error.message);
        return res.status(500).send('Internal Server Error'); // Return to stop further execution
    }
};

exports.getAllAppoinments = async (req, res) => {
    try {
        const appoinmentsList = await Appoinment.find()
        .populate('doctor_details')
        .populate('user_details')
        .exec();
        res.json(appoinmentsList)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
}

exports.getDoctorAppoinments = async (req, res) => {
    const { user_id } = req.params; // Get user_id from the request parameters

    try {
        // Find the doctor associated with the provided user_id
        const doctor = await Doctor.findOne({ user_details: user_id });

        if (!doctor) {
            return res.status(404).send('Doctor not found');
        }

        // Find all appointments for this doctor
        const appoinmentsList = await Appoinment.find({ doctor_details: doctor._id })
            .populate('doctor_details')
            .populate('user_details')
            .exec();

        res.json(appoinmentsList);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error');
    }
};

