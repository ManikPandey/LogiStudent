const express = require('express');
const router = express.Router();
// We will create the controller functions in the next step
const { registerUser, loginUser } = require('../controllers/authController');

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;