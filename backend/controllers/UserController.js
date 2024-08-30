const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { blacklistToken } = require('../middlewares/auth');

//User Registration
exports.registerUser = async (req, res) => {
  const { first_name, last_name, address, contact, email, date_of_birth, password, role, acc_status } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ first_name, last_name, address, contact, date_of_birth, password, email, role, acc_status });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

//User Login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
  
      const payload = { user: { id: user.id } };
      jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            role: user.role,
            acc_status: user.acc_status
          }
        });
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Login Failed. Internal Server error!');
    }
  };
  

//Get User Details by ID
exports.getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Cannot Fetch User, Internal Server error!');
  }
};

//Update User by ID
exports.updateUser = async (req, res) => {
  const { first_name, last_name, address, contact, email, date_of_birth, password, role, acc_status } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    user.first_name = first_name || user.first_name;
    user.last_name = last_name || user.last_name;
    user.address = address || user.address;
    user.contact = contact || user.contact;
    user.email = email || user.email;
    user.date_of_birth = date_of_birth || user.date_of_birth;
    user.password = password || user.password;
    user.role = role || user.role;
    user.acc_status = acc_status || user.acc_status;
    await user.save();
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('User Update Failed. Internal Server error!');
  }
};

//Fetch all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Cannot Get User List. Internal Server error!');
  }
};

//Get User By Email
exports.getUserByEmail = async (req, res) => {
  const { email } = req.body; // Extract email directly from req.body

  try {
    const user = await User.findOne({ email }).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Cannot Fetch User, Internal Server error!');
  }
};

//Logout
exports.logoutUser = (req, res) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');

    blacklistToken(token); // Invalidate the token by adding it to the blacklist

    res.json({ msg: 'User logged out successfully' });
  } catch (error) {
    console.log(error+"Error with logout");
  }
};
