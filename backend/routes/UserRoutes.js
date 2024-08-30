const express = require('express');
const auth = require('../middlewares/auth');

const {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser,
  getAllUsers,
  getUserByEmail,
  logoutUser
} = require('../controllers/UserController');

const router = express.Router();

router.post('/register', registerUser); //Route for the register
router.post('/login', loginUser); //Route for the login
router.get('/get/:id', getUserDetails); // Route for user details
router.put('/update/:id', updateUser); // Route for updating a user
router.get('/list', getAllUsers); // Route for fetching all users
router.get('/email', getUserByEmail); // Route for fetching user by email
router.post('/logout', auth, logoutUser); //Route for logout

module.exports = router;
