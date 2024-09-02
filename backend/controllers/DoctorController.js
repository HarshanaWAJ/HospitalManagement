const Doctor = require('../models/Doctor');
const User = require('../models/User');

exports.addDoctorDetails = async (req, res) => {
    const {
        doctor_id,
        email, 
        specialization,
        qualifications = [],
        medical_license_number,
        department,
        employment_type
    } = req.body;

    try {
        const existUser = await User.findOne({email});

        if (!existUser) {
            return res.status(404).send('User Not Found');
        }
        const existingDoctor =  await Doctor.findOne({medical_license_number})

        if (!existingDoctor) {
            const doctor = new Doctor({
                doctor_id,
                user_details: existUser._id,
                specialization,
                qualifications,
                medical_license_number,
                department,
                employment_type
            });
            await doctor.save();
            res.json(doctor)
        }
        else {
            res.status(409).send('Doctor is Already Exits')
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
};

exports.getDoctorDetails = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate('user_details') // Populate the user_details field with User data (Make the Connection between tables)
            .exec();
        res.json(doctors);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};

exports.getSelectedDoctorDetails = async (req, res) => {
    try {
        const doctors = await Doctor.find()
            .populate({
                path: 'user_details', // Populate the user_details field (Make the Connection between tables)
                select: 'first_name last_name email contact' // Select fields from the User model
        })
        .exec();
        res.json(doctors);
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};

exports.updateDoctorById = async (req, res) => {
    const {
        email,
        specialization,
        qualifications = [],
        medical_license_number,
        department,
        employment_type
    } = req.body
    try {
        let doctor = await Doctor.findById(req.params.id);
        if (!doctor) return res.status(404).json({ msg: 'Doctor not found' });

        const existDoctor = await User.findOne({email});
        if (!existDoctor) {
            res.status(404).send('Email is Invalied')
        }

        doctor.user_details = existDoctor._id
        doctor.specialization = specialization || doctor.specialization
        doctor.qualifications = qualifications || doctor.qualifications
        doctor.medical_license_number = medical_license_number || doctor.medical_license_number
        doctor.department = department || doctor.department
        doctor.employment_type = employment_type || doctor.employment_type
        
        await doctor.save();
        res.json(doctor);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};

exports.doctorDeleteById = async (req, res) => {
    let _id = req.params.id
    try {
        deletedDoctor = await Doctor.findByIdAndDelete(_id)
        if (!deletedDoctor) {
            res.status(404).send('Doctor Delete Failed')
        }
        res.status(200).send(deletedDoctor)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal Server Error')
    }
}

exports.getDoctorDetailsBySpecialization = async (req, res) => {
    const {specialization} = req.body
    try {
        const doctors = await Doctor.findOne({specialization})
            .populate('user_details') // Populate the user_details field with User data (Make the Connection between tables)
            .exec();
        if (!doctors) {
            res.status(404).send("No Doctor Found")
        }
        res.json(doctors)
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Server Error');
    }
};